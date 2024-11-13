import React from 'react';

interface SliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {React.Children.map(children, (child) => (
        <>{child}</>
      ))}
    </div>
  );
};

export default Slider;
