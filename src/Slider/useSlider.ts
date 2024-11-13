// import { Props } from './';

import { useState } from 'react';

// type UseSliderProps = Pick<Props>;

interface UseSliderResponse {
  offsetX: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const useSlider = (/* {}: UseSliderProps */): UseSliderResponse => {
  const [offsetX, setOffsetX] = useState(0);
  console.log('offsetX: ', offsetX);

  const handleNext = () => {
    setOffsetX((prev) => prev - 8);
  };

  const handlePrev = () => {
    setOffsetX((prev) => prev + 8);
  };

  return {
    offsetX,
    handleNext,
    handlePrev,
  };
};

export default useSlider;
