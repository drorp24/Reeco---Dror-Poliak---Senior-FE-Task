import { ReactNode } from 'react';

type Layout = 'horizontal' | 'vertical';

type ScrollMethod = 'card' | 'pixels';

// Slider API, allowing all props to be optional
export interface SliderProps {
  children: ReactNode;
  gap?: number; // Gap between items in pixels
  scrollAmount?: number; // Number of pixels to scroll with each click
  layout?: Layout; //  direction
  scrollMethod?: ScrollMethod; // Count pixels or progress one card at a time
  responsive?: boolean; // Whether to show arrows on hover only
}

// Only the customization props, for the demo components
export type SliderCustomProps = Omit<SliderProps, 'children'>;

// Custom props with all props required, for the default values object and for the useSlider hook
export type SliderPropsValues = Required<SliderCustomProps>;

// One central Default values constant instead of scattered assignments
export const SliderPropsDefaultValues: SliderPropsValues = {
  gap: 20,
  scrollAmount: 8,
  layout: 'horizontal',
  scrollMethod: 'pixels',
  responsive: false,
};
