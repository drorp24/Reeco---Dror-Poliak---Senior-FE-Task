import throttle from 'lodash.throttle';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { SliderPropsValues } from './Slider.types';

interface UseSliderResponse {
  containerRef: React.RefObject<HTMLDivElement>;
  showStartArrow: boolean;
  showEndArrow: boolean;
  scrollAwayFromStart: () => void;
  scrollBackToStart: () => void;
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

const useSlider = ({
  scrollAmount,
  layout,
}: SliderPropsValues): UseSliderResponse => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [showStartArrow, setShowStartArrow] = useState(false);
  const [showEndArrow, setShowEndArrow] = useState(false);

  // update arrows state per the scroll position
  const updateArrows = () => {
    if (!containerRef.current) return;
    const {
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = containerRef.current;

    const scrolledBeforeStart =
      layout === 'horizontal' ? scrollLeft > 0 : scrollTop > 0;

    const didntReachTheEnd =
      layout === 'horizontal'
        ? scrollLeft + clientWidth < scrollWidth
        : scrollTop + clientHeight < scrollHeight;

    // console.group('!!! updateArrows1');
    // console.log('containerRef.current: ', containerRef.current);

    // console.log('hotizontal"');
    // console.log('scrollLeft: ', scrollLeft);
    // console.log('scrollWidth: ', scrollWidth);
    // console.log('clientWidth: ', clientWidth);

    // console.log('vertical"');
    // console.log('scrollTop: ', scrollTop);
    // console.log('scrollHeight: ', scrollHeight);
    // console.log('clientHeight: ', clientHeight);

    // console.log('scrolledBeforeStart: ', scrolledBeforeStart);
    // console.log('didntReachTheEnd: ', didntReachTheEnd);

    // console.log(' ');
    // console.groupEnd();

    setShowStartArrow(scrolledBeforeStart);
    setShowEndArrow(didntReachTheEnd);
  };

  // throttle updateArrows (or else it would get called dozens of times on each click)
  const updateArrowsThrottled = useCallback(
    throttle(updateArrows, 100) as () => void,
    [layout],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // update arrow states upon first render
    updateArrowsThrottled();

    // update arrow states upon container scroll
    const container = containerRef.current;
    container?.addEventListener('scroll', updateArrowsThrottled);

    // remove event listener upon unmount
    return () => {
      container?.removeEventListener('scroll', updateArrowsThrottled);
    };
  }, [layout]);

  const scrollDirection = layout === 'horizontal' ? 'left' : 'top';

  const scrollAwayFromStart = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      [scrollDirection]: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollBackToStart = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      [scrollDirection]: scrollAmount,
      behavior: 'smooth',
    });
  };

  return {
    containerRef,
    showStartArrow,
    showEndArrow,
    scrollAwayFromStart,
    scrollBackToStart,
  };
};

export default useSlider;
