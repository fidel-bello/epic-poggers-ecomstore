import { useQuery } from 'react-query';
import { dynamicApi } from './dynamicApi';
import { Product } from '../models/productTypes';

/**
 * we can call our product actions as hooks
 * useProductHooks will take in props. later will add more. for now the currentPage
 */

const queryKey = 'products';

const URL = process.env.REACT_APP_BASE_URL;

const link = `${URL}/v1/products?page=`;

export default function useProductHooks(props: any) {
  const { currentPage = 1 } = props;

  const getProducts = useQuery<{ productCount: number, resPerPage: number, products: Product[] }>(

    queryKey,

    async () => dynamicApi('get', `${link}${currentPage}`, {}),
  );

  return { getProducts };
}
