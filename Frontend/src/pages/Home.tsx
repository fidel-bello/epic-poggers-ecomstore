import { useQuery } from 'react-query';
import axios from 'axios';
import {
  Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography,
} from '@mui/material';
import { Product } from '../types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Home() {
  const { data, isLoading } = useQuery('get-products', () => axios.get(`${BASE_URL}/v1/products`));

  if (!data || isLoading) return null;

  const products: Product[] = data?.data.products;

  return (
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
  );
}
