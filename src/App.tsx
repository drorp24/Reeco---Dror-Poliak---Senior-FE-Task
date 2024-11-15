import React from 'react';

import './App.css';
import DemoMenu from './demos/DemoMenu';
import useDemo from './demos/useDemo';

const demoPageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6vh',
};

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
    responsiveOptions,
    responsive,
    setResponsive,
  } = useDemo();

  return (
    <div style={demoPageStyle}>
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
        responsiveOptions={responsiveOptions}
        responsive={responsive}
        setResponsive={setResponsive}
      />
      <DemoComponent
        layout={layout}
        scrollAmount={scrollAmount}
        scrollMethod={scrollMethod}
        responsive={responsive}
      />
    </div>
  );
};

export default App;
