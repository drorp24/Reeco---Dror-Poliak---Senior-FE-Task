import React, { CSSProperties } from 'react';

import useProducts, { Product, UseProductsResponse } from './useProducts';
import Slider from '../Slider/Slider';
import { SliderCustomProps } from '../Slider/Slider.types';

interface ProductCardProps {
  product: Product;
}

// in a real app, a Card would be its own generic component with props for customization
const productCardStyle: CSSProperties = {
  position: 'relative',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '270px',
  minWidth: '270px',
  height: '365px',
  minHeight: '365px',
  padding: '2rem 1rem',
};

const imageStyle: CSSProperties = {
  width: '70%',
  height: '60%',
};

const titleStyle: CSSProperties = {
  color: 'grey',
  textAlign: 'left',
  padding: '0.5rem',
};

const priceStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  fontWeight: '900',
  color: 'black',
  textAlign: 'left',
  paddingLeft: '0.5rem',
  width: '100%',
  fontSize: '1.2rem',
};

const ProductCard: React.FC<ProductCardProps> = ({
  product: { image, title, price },
}) => (
  <div style={productCardStyle}>
    <img src={image} alt={title} style={imageStyle} />
    <div style={titleStyle}>{title}</div>
    <div style={priceStyle}>${price}</div>
  </div>
);

const skeletonStyle: CSSProperties = {
  width: '100%',
  height: '420px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.5rem',
  color: 'grey',
};

type SkeletonProps = Pick<UseProductsResponse, 'error' | 'loading'>;

const ProductSliderSkeleton: React.FC<SkeletonProps> = ({ error, loading }) => (
  <div style={skeletonStyle}>
    {loading ? 'Loading...' : `Error: ${error.toString()}`}
  </div>
);

const ProductSlider: React.FC<SliderCustomProps> = (sliderCustomProps) => {
  const { error, loading, products } = useProducts();

  if (error || loading)
    return <ProductSliderSkeleton error={error} loading={loading} />;

  return (
    <>
      <h2>Product Slider</h2>
      <Slider {...sliderCustomProps}>
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </Slider>
    </>
  );
};

export default ProductSlider;
