import { ReactNode } from 'react';

// Slider API, allowing all props to be optional
export interface SliderProps {
  children: ReactNode;
  gap?: number; // Gap between items in pixels
  scrollAmount?: number; // Number of pixels to scroll with each click
}

// Derived type, with all props required, for the default values object and for the useSlider hook
export type SliderPropsValues = Required<Omit<SliderProps, 'children'>>;

// One central Default values constant instead of scattered assignments
export const SliderPropsDefaultValues: SliderPropsValues = {
  gap: 10,
  scrollAmount: 200,
};
