import React from 'react';

import './App.css';
import DemoMenu from './demos/DemoMenu';
import useDemo from './demos/useDemo';

const App: React.FC = () => {
  const {
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
  } = useDemo();

  return (
    <>
      <DemoMenu
        demos={demos}
        demo={demo}
        setDemo={setDemo}
        layouts={layouts}
        layout={layout}
        setLayout={setLayout}
        scrollOptions={scrollOptions}
        scroll={scroll}
        setScroll={setScroll}
        scrollAmount={scrollAmount}
        scrollMethod={scrollMethod}
      />
      <DemoComponent
        layout={layout}
        scrollAmount={scrollAmount}
        scrollMethod={scrollMethod}
      />
    </>
  );
};

export default App;
