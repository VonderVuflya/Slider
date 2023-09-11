import { FC, useState } from 'react'
import useDimensions from 'react-cool-dimensions'

import { SliderProps } from './Slider.types'
import sliderService from './Slider.service'

import * as Styled from './Slider.styled'

const Slider: FC<SliderProps> = ({
  value,
  setValue,
  min = 10,
  max = 100,
  step = 10,
  sliderHeight = 4,
  color,
  colorCircleDot = '#fff',
  colorDefault = '#bd9b9b',
  showDotInCircle = true,
  thumbRadius = 50,
  miniThumbsShow = false,
}) => {
  const [currentWidth, setCurrentWidth] = useState(280)

  const { observe } = useDimensions({
    onResize: ({ width }) => setCurrentWidth(width),
  })

  const handleSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.currentTarget.value, 10)
    setValue(newValue)
  }

  return (
    <Styled.Container ref={observe}>
      <Styled.Slider
        type='range'
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        sliderHeight={sliderHeight}
        currentWidth={currentWidth}
        colorSlider={sliderService.hexToRgb(color)}
        colorCircleDot={sliderService.hexToRgb(colorCircleDot)}
        colorDefault={sliderService.hexToRgb(colorDefault)}
        showDotInCircle={showDotInCircle}
        thumbRadius={thumbRadius}
        miniThumbsShow={miniThumbsShow}
        onTouchStart={e => e.preventDefault()}
      />
    </Styled.Container>
  )
}

export default Slider
