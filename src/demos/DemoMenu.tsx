import React from 'react';

import { SliderDemoKeys, UseDemoResponse } from './useDemo';

const demoMenuStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
  padding: '1rem',
  maxHeight: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5rem',
};

const demoChipStyle: (selected: boolean) => React.CSSProperties = (
  selected,
) => ({
  height: '2.4rem',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  fontSize: '1.3rem',
  color: selected ? 'white' : 'rgba(255, 255, 255, 0.3)',
  borderRadius: '2px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
});

const menuLineStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
};

type DemoMenuProps = Omit<UseDemoResponse, 'DemoComponent'>;

const demoTitleStyle: React.CSSProperties = {
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
  textAlign: 'left',
};

const menuLinesStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const DemoMenuTitle: React.FC = () => (
  <div style={demoTitleStyle}>
    <h1 style={{ fontSize: '2.5rem', width: '100%' }}>Slider Demo</h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ fontSize: '1.3rem' }}>Click buttons to view the demos.</div>
      <div style={{ fontSize: '1.3rem' }}>Try using keyboard arrows too.</div>
    </div>
  </div>
);

const DemoMenu: React.FC<DemoMenuProps> = ({
  demos,
  demo,
  setDemo,
  layouts,
  layout,
  setLayout,
  scrollOptions,
  scroll,
  setScroll,
}) => (
  <div style={demoMenuStyle}>
    <DemoMenuTitle />
    <div style={menuLinesStyle}>
      <div style={menuLineStyle}>
        {demos.map((d) => (
          <button
            key={d}
            className="optionButton"
            style={demoChipStyle(d === demo)}
            onClick={() => setDemo(d as SliderDemoKeys)}
          >
            {d}
          </button>
        ))}
      </div>
      <div style={menuLineStyle}>
        {layouts.map((l) => (
          <button
            key={l}
            className="optionButton"
            style={demoChipStyle(l === layout)}
            onClick={() => setLayout(l as 'horizontal' | 'vertical')}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={menuLineStyle}>
        {scrollOptions.map((s) => (
          <button
            key={s}
            className="optionButton"
            style={demoChipStyle(s === scroll)}
            onClick={() => setScroll(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default DemoMenu;
