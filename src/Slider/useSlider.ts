import throttle from 'lodash.throttle';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { SliderPropsValues } from './Slider.types';

interface UseSliderResponse {
  containerRef: React.RefObject<HTMLDivElement>;
  showStartArrow: boolean;
  showEndArrow: boolean;
  scrollForward: () => void;
  scrollBackward: () => void;
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
  scrollMethod,
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
        ? scrollLeft + clientWidth < scrollWidth - 1
        : scrollTop + clientHeight < scrollHeight;

    setShowStartArrow(scrolledBeforeStart);
    setShowEndArrow(didntReachTheEnd);
  };

  // throttle updateArrows (preventing it from getting called dozens of times on each click)
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

    // update arrow states upon window resize
    const handleResize = () => updateArrowsThrottled();
    window.addEventListener('resize', handleResize);

    // scroll by entire card upon arrows key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        scrollByCard({ forward: false });
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        scrollByCard({ forward: true });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // remove all event listeners upon unmount
    return () => {
      container?.removeEventListener('scroll', updateArrowsThrottled);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [layout]);

  const scrollDirection = layout === 'horizontal' ? 'left' : 'top';

  const scrollByPixels = ({
    scrollDirection,
    scrollAmount,
    forward,
  }: {
    scrollDirection: string;
    scrollAmount: number;
    forward: boolean;
  }) => {
    containerRef?.current?.scrollBy({
      [scrollDirection]: forward ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  // move forward (or backward) one card
  // in other words: make the card next to the one on the left / top become the first one in view.
  const scrollByCard = ({ forward }: { forward: boolean }) => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollTop } = containerRef.current;

    const childrenArray = Array.from(
      containerRef.current.children,
    ) as HTMLElement[];

    // we're looking for the first card to our right (forward) or left (backward)
    // and since find stops at the first match, we have to start looking from either start (forward) or end (backward)
    const array = forward ? childrenArray : childrenArray.reverse();

    const isHorizontal = layout === 'horizontal';

    const targetChild = childrenArray.find((child) => {
      const childPosition = isHorizontal ? child.offsetLeft : child.offsetTop;
      const scrollPosition = isHorizontal ? scrollLeft : scrollTop;

      return forward
        ? childPosition > scrollPosition + 1
        : childPosition < scrollPosition;
    });

    if (targetChild) {
      const targetPosition = isHorizontal
        ? targetChild.offsetLeft
        : targetChild.offsetTop;

      containerRef.current.scrollTo({
        [isHorizontal ? 'left' : 'top']: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Todo: useCallback
  const scroll =
    ({ forward }: { forward: boolean }) =>
    () => {
      scrollMethod === 'pixels'
        ? scrollByPixels({ scrollDirection, scrollAmount, forward })
        : scrollByCard({ forward });
    };

  const scrollForward = scroll({ forward: true });
  const scrollBackward = scroll({ forward: false });

  return {
    containerRef,
    showStartArrow,
    showEndArrow,
    scrollBackward,
    scrollForward,
  };
};

export default useSlider;
