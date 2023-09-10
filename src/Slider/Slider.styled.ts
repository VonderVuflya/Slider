import styled from 'styled-components'

import { StyledProps } from './Slider.types'
import sliderService from './Slider.service'

export const Container = styled.div`
  position: relative;
`

export const Slider = styled.input<StyledProps>`
  appearance: none;
  width: 100%;
  height: ${({ sliderHeight }) => sliderHeight}px;
  padding: 0;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  background-image: ${({ value, colorSlider }) =>
    sliderService.getBgColor(value, colorSlider)};

  /* Круг */
  &::-webkit-slider-thumb {
    appearance: none;
    position: absolute;
    top: 2px;
    left: ${({ currentWidth, value, sliderHeight }) =>
      sliderService.setDotPosition(currentWidth, value, sliderHeight)}px;
    height: 22px;
    width: 22px;
    border-radius: ${({ thumbRadius }) => `${thumbRadius}%`};
    background: ${({ colorSlider, colorCircleDot, showDotInCircle }) =>
      showDotInCircle ? colorCircleDot : colorSlider};
    border: ${({ sliderHeight, colorSlider }) =>
      `${sliderHeight * 2 - 1}px solid ${colorSlider}`};
    box-shadow: 0 0 6px
      ${({ colorSlider }) => sliderService.hexToRgb(colorSlider, 0.5)};
    z-index: 99;
  }

  /* Mozilla круг */
  &::-moz-range-thumb {
    appearance: none;
    position: absolute;
    top: 2px;
    left: ${({ currentWidth, value, sliderHeight }) =>
      sliderService.setDotPosition(currentWidth, value, sliderHeight)}px;
    height: 22px;
    width: 22px;
    border-radius: ${({ thumbRadius }) => `${thumbRadius}%`};
    background: ${({ colorSlider, colorCircleDot, showDotInCircle }) =>
      showDotInCircle ? colorCircleDot : colorSlider};
    border: 8px solid ${({ colorSlider }) => colorSlider};
    box-shadow: 0 0 6px
      ${({ colorSlider }) => sliderService.hexToRgb(colorSlider, 0.5)};
    box-sizing: border-box;
    z-index: 99;
  }

  /* Точки */
  &:after {
    content: '';
    position: absolute;
    display: ${({ miniThumbsShow }) => (miniThumbsShow ? 'block' : 'none')};
    background: ${({ value, colorDefault, colorSlider }) =>
      sliderService.chosenNumber(value) === 0 ? colorDefault : colorSlider};
    width: ${({ sliderHeight }) => sliderHeight * 2 - 1}px;
    height: ${({ sliderHeight }) => sliderHeight * 2 - 1}px;
    border-radius: 50%;
    top: 10px;
    left: 0;
    z-index: 1;
    box-shadow: ${({
      value,
      currentWidth: width,
      colorSlider: color,
      colorDefault,
    }) => sliderService.getShadowDots({ value, width, color, colorDefault })};
  }
`
