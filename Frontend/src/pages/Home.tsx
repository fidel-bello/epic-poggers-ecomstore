import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { Product } from '../types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Home() {
  const [page, setPage] = useState(1);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading } = useQuery<{
    count: number;
    productCount: number;
    products: Product[];
  }>(['get-products', page], () => axios.get(`${BASE_URL}/v1/products?page=${page}`).then((res) => res?.data));

  if (!data || isLoading) return null;

  const { products } = data;

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            // eslint-disable-next-line no-underscore-dangle
            <Grid item xs={12} sm={4} md={3} key={product._id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height={250}
                    image={product.images[0].url}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                    <Typography>
                      $
                      {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        position="fixed"
        display="flex"
        justifyContent="center"
        bottom={0}
        width="100%"
        mb={4}
      >
        <Pagination
          count={Math.ceil(data.productCount / 4)}
          page={page}
          onChange={handlePageChange}
          sx={{
            borderRadius: 1,
            p: 1,
          }}
        />
      </Box>
    </>
  );
}
