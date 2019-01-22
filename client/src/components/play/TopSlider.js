import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

// const { Handle } = Slider;
const style = { margin: '50px 0px 50px 0px', backgroundColor: '#fff' };

const TopSlider = ({ maxValue, currentValue }) => (
  <section>
    <div style={style}>
      <Slider
        min={0}
        max={maxValue}
        defaultValue={0}
        value={currentValue}
        disabled
        activeDotStyle={{ borderColor: 'yellow' }}
        trackStyle={{ backgroundColor: '#4183C4' }}
        handleStyle={{ backgroundColor: '#4183C4' }}
      />
    </div>
  </section>
);

TopSlider.propTypes = {
  maxValue: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired
};

export default TopSlider;
