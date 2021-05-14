import React from 'react';
import useDimensions from 'react-cool-dimensions';
import styled from 'styled-components';

import {
  getShadowDots,
  chosenNumber,
  setDotPosition,
  getBgColor,
  hexToRgb,
} from '../utils/helpers';

const SliderContainer = styled.div`
  position: relative;
`;
const SliderStyled = styled.input`
  appearance: none;
  width: 100%;
  height: 4px;
  padding: 0;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  background-image: ${(props) => getBgColor(props.value, props.color)};

  /* Круг */
  &::-webkit-slider-thumb {
    appearance: none;
    position: absolute;
    top: 1px;
    left: ${(props) => setDotPosition(props.currentWidth, props.value)}px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #fff;
    border: 8px solid ${(props) => hexToRgb(props.color)};
    box-shadow: 0px 0px 6px ${(props) => hexToRgb(props.color, 0.5)};
    z-index: 99;
  }

  /* Mozilla круг */
  &::-moz-range-thumb {
    appearance: none;
    position: absolute;
    top: 1px;
    left: ${(props) => setDotPosition(props.currentWidth, props.value)}px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #fff;
    border: 8px solid ${(props) => hexToRgb(props.color)};
    box-shadow: 0px 0px 6px ${(props) => hexToRgb(props.color, 0.5)};
    box-sizing: border-box;
    z-index: 99;
  }

  /* Точки */
  &:after {
    content: '';
    position: absolute;
    background: ${(props) =>
      chosenNumber(props.value, 10) === 0 ? props.defaultColor : hexToRgb(props.color)};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 10px;
    left: 0px;
    z-index: 1;
    box-shadow: ${(props) => getShadowDots(
      props.value,
      props.currentWidth,
      props.color,
      props.defaultColor,
    )};
  }
`;

const Slider = ({
  value,
  setValue,
  min = 10,
  max = 100,
  step = 10,
  color,
  defaultColor = '#c4c4c4',
}) => {
  const [currentWidth, setCurrentWidth] = React.useState('280');

  const { observe } = useDimensions({
    onResize: ({ width }) => setCurrentWidth(width),
  });

  const handleSliderChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };
  return (
    <SliderContainer ref={observe}>
      <SliderStyled
        type="range"
        value={value}
        onChange={handleSliderChange}
        step={step}
        min={min}
        max={max}
        currentWidth={currentWidth}
        color={color}
        defaultColor={hexToRgb(defaultColor)}
      />
    </SliderContainer>
  );
};

export default Slider;
