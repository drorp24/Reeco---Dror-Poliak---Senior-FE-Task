import React from 'react';

import Slider from '../Slider/Slider';

const slideItemStyle = {
  width: '300px',
  minWidth: '250px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '1rem',
};

interface ColorSliderProps {
  colors?: number;
}

const ColorSlider: React.FC<ColorSliderProps> = ({ colors = 10 }) => (
  <div style={{ width: '100%' }}>
    <h2>Color Slider</h2>
    <Slider>
      {Array.from({ length: colors }).map((_, index) => (
        <div
          key={index}
          style={{
            ...slideItemStyle,
            backgroundColor: `hsl(${(360 / colors) * index}, 100%, 50%)`,
          }}
        >
          <h3>Slide {index}</h3>
        </div>
      ))}
    </Slider>
  </div>
);

export default ColorSlider;
