import React, { CSSProperties } from 'react';

import { SliderProps, SliderPropsDefaultValues } from './Slider.types';
import useSlider from './useSlider';

const sliderStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle: CSSProperties = {
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',
  borderRadius: '50%',
  border: 0,
  height: '3.5rem',
  width: '3.5rem',
  fontSize: '1.2rem',
  color: '#fff',
  fontWeight: 'bold',
};

const rightShadow = { boxShadow: '8px 0 10px rgba(0, 0, 0, 0.3)' };
const leftShadow = { boxShadow: '-8px 0 10px rgba(0, 0, 0, 0.3)' };

const containerStyle: (gap: number) => CSSProperties = (gap) => ({
  display: 'flex',
  gap: `${gap}px`,
});

const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
  // complete all props with default values, using our default props object
  const sliderProps = { ...SliderPropsDefaultValues, ...props };

  const { gap } = sliderProps;

  const {
    containerRef,
    showLeftArrow,
    showRightArrow,
    leftScroll,
    rightScroll,
  } = useSlider(sliderProps);

  return (
    <div style={sliderStyle}>
      {showLeftArrow && (
        <button
          onClick={rightScroll}
          style={{ ...buttonStyle, ...rightShadow, left: 15 }}
        >
          ◀
        </button>
      )}

      <div
        ref={containerRef}
        style={containerStyle(gap)}
        className="scrollable-no-scrollbar"
      >
        {children}
      </div>

      {showRightArrow && (
        <button
          onClick={leftScroll}
          style={{ ...buttonStyle, ...leftShadow, right: 15 }}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default Slider;
