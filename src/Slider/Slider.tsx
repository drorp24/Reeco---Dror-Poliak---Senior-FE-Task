import React from 'react';
import useSlider from './useSlider';

interface SliderProps {
  children: React.ReactNode;
}

const sliderStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  border: '5px solid white',
  overflow: 'hidden',
};

const buttonStyle: React.CSSProperties = {
  position: 'absolute',
  height: '100%',
  zIndex: 1,
  backgroundColor: 'transparent',
};

const Slider: React.FC<SliderProps> = ({ children }) => {
  const { offsetX, handleNext, handlePrev } = useSlider();

  return (
    <div style={sliderStyle}>
      <button onClick={handleNext} style={{ ...buttonStyle, right: 0 }}>
        &gt;
      </button>

      <div style={{ display: 'flex', transform: `translate(${offsetX}px)` }}>
        {React.Children.map(children, (child) => (
          <>{child}</>
        ))}
      </div>

      <button onClick={handlePrev} style={{ ...buttonStyle, left: 0 }}>
        &lt;
      </button>
    </div>
  );
};

export default Slider;
