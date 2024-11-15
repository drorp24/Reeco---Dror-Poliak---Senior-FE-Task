import React, { useState } from 'react';

import ColorSlider from './ColorSlider';
import ProductSlider from './ProductSlider';
import { SliderCustomProps, SliderPropsValues } from '../Slider/Slider.types';

const sliderDemos = {
  colors: ColorSlider,
  products: ProductSlider,
};

const demos = Object.keys(sliderDemos);
const layouts = ['horizontal', 'vertical'];
const scrollOptions = ['8', '200', 'card'] as const;

export type SliderDemoKeys = keyof typeof sliderDemos;
export type ScrollOptions = (typeof scrollOptions)[number];

export interface UseDemoResponse {
  demos: string[];
  demo: SliderDemoKeys;
  setDemo: React.Dispatch<React.SetStateAction<'colors' | 'products'>>;
  DemoComponent: React.ComponentType<SliderCustomProps>;
  layouts: string[];
  layout: SliderPropsValues['layout'];
  setLayout: React.Dispatch<React.SetStateAction<'horizontal' | 'vertical'>>;
  scrollOptions: readonly ['8', '200', 'card'];
  scroll: ScrollOptions;
  setScroll: React.Dispatch<React.SetStateAction<ScrollOptions>>;
  scrollAmount?: SliderPropsValues['scrollAmount'];
  scrollMethod: SliderPropsValues['scrollMethod'];
}

const useDemo = (): UseDemoResponse => {
  const [demo, setDemo] = useState<SliderDemoKeys>('colors');
  const [layout, setLayout] =
    useState<SliderPropsValues['layout']>('horizontal');
  const [scroll, setScroll] = useState<ScrollOptions>('200');

  const DemoComponent = sliderDemos[demo];

  const scrollAmount = scroll === 'card' ? undefined : parseInt(scroll);
  const scrollMethod = scroll === 'card' ? 'card' : 'pixels';

  return {
    demos,
    demo,
    setDemo,
    DemoComponent,
    layouts,
    layout,
    setLayout,
    scrollOptions,
    scroll,
    setScroll,
    scrollAmount,
    scrollMethod,
  };
};

export default useDemo;
