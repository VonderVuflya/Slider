import { useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import styled from 'styled-components'

import {
  getShadowDots,
  chosenNumber,
  setDotPosition,
  getBgColor,
  hexToRgb,
} from '../utils/helpers'

import { SliderProps, StyledProps } from '../types'

const SliderContainer = styled.div`
  position: relative;
`
const SliderStyled = styled.input<StyledProps>`
  appearance: none;
  width: 100%;
  height: 4px;
  padding: 0;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  background-image: ${({ value, sliderColor }) =>
    getBgColor(value, sliderColor)};

  /* Круг */
  &::-webkit-slider-thumb {
    appearance: none;
    position: absolute;
    top: 1px;
    left: ${({ currentWidth, value }) => setDotPosition(currentWidth, value)}px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: ${({ sliderColor, showDotInCircle }) =>
      showDotInCircle ? '#fff' : hexToRgb(sliderColor)};
    border: 8px solid ${({ sliderColor }) => hexToRgb(sliderColor)};
    box-shadow: 0px 0px 6px ${({ sliderColor }) => hexToRgb(sliderColor, 0.5)};
    z-index: 99;
  }

  /* Mozilla круг */
  &::-moz-range-thumb {
    appearance: none;
    position: absolute;
    top: 1px;
    left: ${({ currentWidth, value }) => setDotPosition(currentWidth, value)}px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: ${({ sliderColor, showDotInCircle }) =>
      showDotInCircle ? '#fff' : hexToRgb(sliderColor)};
    border: 8px solid ${({ sliderColor }) => hexToRgb(sliderColor)};
    box-shadow: 0px 0px 6px ${({ sliderColor }) => hexToRgb(sliderColor, 0.5)};
    box-sizing: border-box;
    z-index: 99;
  }

  /* Точки */
  &:after {
    content: '';
    position: absolute;
    background: ${({ value, defaultColor, sliderColor }) =>
      chosenNumber(value) === 0 ? defaultColor : hexToRgb(sliderColor)};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 10px;
    left: 0px;
    z-index: 1;
    box-shadow: ${({
      value,
      currentWidth: width,
      sliderColor: color,
      defaultColor,
    }) => getShadowDots({ value, width, color, defaultColor })};
  }
`

const Slider: React.FC<SliderProps> = ({
  value,
  setValue,
  min = 10,
  max = 100,
  step = 10,
  color,
  defaultColor = '#c4c4c4',
  showDotInCircle = true,
}): JSX.Element => {
  const [currentWidth, setCurrentWidth] = useState(280)

  const { observe } = useDimensions({
    onResize: ({ width }) => setCurrentWidth(width),
  })

  const handleSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.currentTarget.value, 10)
    setValue(newValue)
  }
  return (
    <SliderContainer ref={observe}>
      <SliderStyled
        type='range'
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        currentWidth={currentWidth}
        sliderColor={color}
        defaultColor={hexToRgb(defaultColor)}
        showDotInCircle={showDotInCircle}
      />
    </SliderContainer>
  )
}

export default Slider
