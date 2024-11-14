import React, { useEffect, useRef, useState } from 'react';

import { SliderPropsValues } from './Slider.types';

interface UseSliderResponse {
  containerRef: React.RefObject<HTMLDivElement>;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  leftScroll: () => void;
  rightScroll: () => void;
}

/**
 * Purpose: Manage Slider's state
 *
 * @params
 * All Slider props but children are passed here.
 * All arrive here populated, by either user values or default ones.
 * These two will help us extend functionality easily while keeping the API clean.
 *
 * @eturns
 * Slider state
 * We want to keep implementation details here only, away from the Slider component,
 * so we can modify the implementation or extend functionality without breaking the API.
 *
 */

const useSlider = ({ scrollAmount }: SliderPropsValues): UseSliderResponse => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollLeft, scrollWidth, clientWidth } = containerRef?.current || {};

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  console.group('useSlider');
  console.log('containerRef?.current: ', containerRef?.current);
  console.log('clientWidth: ', clientWidth);
  console.log('scrollWidth: ', scrollWidth);
  console.log('scrollLeft: ', scrollLeft);
  console.log('showLeftArrow: ', showLeftArrow);
  console.log('showRightArrow: ', showRightArrow);
  console.log(' ');
  console.groupEnd();

  useEffect(() => {
    const updateArrows = () => {
      if (!containerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    };

    updateArrows(); // Initial check
    const container = containerRef.current;
    container?.addEventListener('scroll', updateArrows);

    return () => {
      container?.removeEventListener('scroll', updateArrows);
    };
  }, []);

  const leftScroll = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const rightScroll = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  // TESTING

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.rightScroll = rightScroll;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.leftScroll = leftScroll;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.container = containerRef.current;

  return {
    containerRef,
    showLeftArrow,
    showRightArrow,
    leftScroll,
    rightScroll,
  };
};

export default useSlider;
