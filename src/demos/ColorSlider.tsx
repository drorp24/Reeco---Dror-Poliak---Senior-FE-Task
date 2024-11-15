import React, { CSSProperties } from 'react';

import Slider from '../Slider/Slider';
import { SliderCustomProps } from '../Slider/Slider.types';

// let the caller decide how it allows its dimension to change when in slider
const slideItemStyle: CSSProperties = {
  width: '300px',
  minWidth: '250px',
  height: '300px',
  minHeight: '250px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '1rem',
};

interface ColorSliderProps extends SliderCustomProps {
  colors?: number;
}

const indexColor = (index: number, colors: number) => {
  return `hsl(${(360 / colors) * index}, 100%, 50%)`;
};

const ColorSlider: React.FC<ColorSliderProps> = ({
  colors = 10,
  ...sliderCustomProps
}) => (
  <div style={{ width: '100%' }}>
    <h2>Color Slider</h2>
    <Slider {...sliderCustomProps}>
      {Array.from({ length: colors }).map((_, index) => (
        <div
          key={index}
          style={{
            ...slideItemStyle,
            backgroundColor: indexColor(index, colors),
          }}
        >
          <h3>Slide {index}</h3>
        </div>
      ))}
    </Slider>
  </div>
);

export default ColorSlider;
