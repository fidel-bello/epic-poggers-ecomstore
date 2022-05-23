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
import {
  ChangeEvent, useState, Fragment, useEffect,
} from 'react';
import useProductHooks from '../actions/productQueries';

export default function Home() {
  const [currentPage, setPage] = useState(1);

  const { getProducts } = useProductHooks({ currentPage });

  const { data, isLoading, refetch } = getProducts;

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!data) return null;

  const { resPerPage, productCount } = data;

  return (

    <>
      {' '}
      {/* Fragment allows you to wrap multiple elements without adding an extra node to the Dom */}

      { isLoading ? (
        <div>
          loading..
          {/* will put a spinner around here for loading purposes */}
        </div>
      ) : (

        <>

          <Container sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {data?.products.map((product) => (
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
              count={Math.ceil(productCount / resPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                borderRadius: 1,
                p: 1,
              }}
            />
          </Box>

        </>
      )}

    </>

  );
}
