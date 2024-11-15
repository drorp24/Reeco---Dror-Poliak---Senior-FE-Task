import { useEffect, useState } from 'react';

export interface Product {
  image: string;
  price: number;
  title: string;
}

export interface UseProductsResponse {
  loading: boolean;
  error: boolean;
  products: Product[];
}

const useProducts = (): UseProductsResponse => {
  // using no library for simplicity (no caching, etc.)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/women%27s%20clothing')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts([...data, ...data] as Product[]); // double products for demo
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return { error, loading, products };
};

export default useProducts;
