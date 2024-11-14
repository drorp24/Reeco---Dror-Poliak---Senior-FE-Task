import React, { CSSProperties } from 'react';

import {
  SliderProps,
  SliderPropsDefaultValues,
  SliderPropsValues,
} from './Slider.types';
import useSlider from './useSlider';

const sliderStyle: (layout: SliderPropsValues['layout']) => CSSProperties = (
  layout,
) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: layout === 'horizontal' ? 'row' : 'column',
  alignItems: 'center',
  maxHeight: '500px',
});

const buttonStyle: (
  position: 'start' | 'end',
  layout: SliderPropsValues['layout'],
) => CSSProperties = (position, layout) => ({
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
  boxShadow:
    position === 'start'
      ? '8px 0 10px rgba(0, 0, 0, 0.3)'
      : '-8px 0 10px rgba(0, 0, 0, 0.3)',
  ...(position === 'start' && layout === 'horizontal' && { left: 15 }),
  ...(position === 'start' && layout === 'vertical' && { top: 15 }),
  ...(position === 'end' && layout === 'horizontal' && { right: 15 }),
  ...(position === 'end' && layout === 'vertical' && { bottom: 15 }),
  ...(layout === 'vertical' && { transform: 'rotate(90deg)' }),
});

const containerStyle: (
  gap: SliderPropsValues['gap'],
  layout: SliderPropsValues['layout'],
) => CSSProperties = (gap, layout) => ({
  display: 'flex',
  gap: `${gap}px`,
  flexDirection: layout === 'horizontal' ? 'row' : 'column',
  overflowX: layout === 'horizontal' ? 'auto' : 'hidden',
  overflowY: layout === 'vertical' ? 'auto' : 'hidden',
});

const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
  // complete all props with default values, using our default props object
  const sliderProps = { ...SliderPropsDefaultValues, ...props };

  const { gap, layout } = sliderProps;

  const {
    containerRef,
    showStartArrow,
    showEndArrow,
    scrollAwayFromStart,
    scrollBackToStart,
  } = useSlider(sliderProps);

  return (
    <div style={sliderStyle(layout)}>
      {showStartArrow && (
        <button
          onClick={scrollAwayFromStart}
          style={buttonStyle('start', layout)}
        >
          ◀
        </button>
      )}

      <div
        ref={containerRef}
        style={containerStyle(gap, layout)}
        className="scrollable-no-scrollbar"
      >
        {children}
      </div>

      {showEndArrow && (
        <button onClick={scrollBackToStart} style={buttonStyle('end', layout)}>
          ▶
        </button>
      )}
    </div>
  );
};

export default Slider;
