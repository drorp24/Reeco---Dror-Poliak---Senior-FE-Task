import Slider from '../Slider/Slider';

const slideItemStyle = {
  width: '300px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ColorSlider: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <h2>Color Slider</h2>
      <Slider>
        <div
          style={{
            ...slideItemStyle,
            backgroundColor: 'green',
          }}
        >
          <h3>Slide 1</h3>
        </div>
        <div
          style={{
            ...slideItemStyle,
            backgroundColor: 'red',
          }}
        >
          <h3>Slide 2</h3>
        </div>
        <div
          style={{
            ...slideItemStyle,
            backgroundColor: 'blue',
          }}
        >
          <h3>Slide 3</h3>
        </div>
      </Slider>
    </div>
  );
};

export default ColorSlider;
