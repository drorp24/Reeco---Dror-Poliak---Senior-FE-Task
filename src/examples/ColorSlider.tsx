import React from 'react';

import Slider from '../Slider/Slider';

// let the caller decide how it allows its dimension to change when in slider
const slideItemStyle = {
  width: '300px',
  minWidth: '250px',
  height: '300px',
  minHeight: '250px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '1rem',
};

interface ColorSliderProps {
  colors?: number;
}

const indexColor = (index: number, colors: number) => {
  return `hsl(${(360 / colors) * index}, 100%, 50%)`;
};

const ColorSlider: React.FC<ColorSliderProps> = ({ colors = 10 }) => (
  <>
    <h2>Color Slider</h2>
    <Slider scrollAmount={200}>
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
  </>
);

export default ColorSlider;
