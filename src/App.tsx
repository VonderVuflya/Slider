import { useState } from 'react'

import sliderService from './Slider/Slider.service'
import Slider from './Slider/Slider'

import * as Styled from './App.styled'

// const palete = {
//   1: '#e8e8db',
//   2: '#ffdf65',
//   3: '#858377',
//   4: '#636057',
//   5: '#494846',
// }

const App = () => {
  const [value, setValue] = useState(50)
  const [color, setColor] = useState('#ffdf65')
  const [circleDotColor, setCircleDotColor] = useState('#858377')
  const [colorDefault, setColorDefault] = useState('#bd9b9b')
  const [isDot, setDot] = useState(true)
  const [isMiniThumbs, setMiniThumbs] = useState(false)
  const [thumbRadius, setThumbRadius] = useState(50)

  const toggleDot = () => setDot(!isDot)
  const toggleMinDots = () => setMiniThumbs(!isMiniThumbs)

  return (
    <div className='App'>
      <h1>Slider</h1>

      <Styled.SliderBlock>
        <Slider
          value={value}
          setValue={setValue}
          min={10}
          max={100}
          step={10}
          color={color}
          colorCircleDot={circleDotColor}
          colorDefault={colorDefault}
          showDotInCircle={isDot}
          thumbRadius={thumbRadius}
          miniThumbsShow={isMiniThumbs}
        />
      </Styled.SliderBlock>

      <Styled.ParamsContainer>
        <Styled.Block>
          <span>Value</span>
          <input
            onChange={e => setValue(parseInt(e.target.value, 10))}
            value={value}
            min='0'
            max='100'
          />
        </Styled.Block>

        <Styled.Block>
          <span>Main color</span>
          <input
            type='color'
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <input
            type='text'
            value={sliderService.rgbToHex(color)}
            onChange={e => setColor(e.target.value)}
          />
        </Styled.Block>

        <Styled.Block>
          <span>Dot in circle color</span>
          <input
            type='color'
            value={circleDotColor}
            onChange={e => setCircleDotColor(e.target.value)}
          />
        </Styled.Block>

        <Styled.Block>
          <span>Dots color</span>
          <input
            type='color'
            value={colorDefault}
            onChange={e => setColorDefault(e.target.value)}
          />
        </Styled.Block>

        <Styled.Block>
          <span>Toggle Circle</span>
          <input
            type='range'
            min={0}
            max={50}
            onChange={e => setThumbRadius(+e.currentTarget.value)}
            value={thumbRadius}
          />
          <input
            type='text'
            value={thumbRadius}
            onChange={e => setThumbRadius(+e.currentTarget.value)}
          />
        </Styled.Block>

        <label htmlFor='dots'>
          <input
            type='checkbox'
            id='dots'
            name='dots'
            onClick={toggleMinDots}
            checked={isMiniThumbs}
          />
          Show dots
        </label>
        <label htmlFor='scales'>
          <input
            type='checkbox'
            id='scales'
            name='scales'
            onClick={toggleDot}
            checked={isDot}
          />
          Toggle dot in circle
        </label>
      </Styled.ParamsContainer>
    </div>
  )
}

export default App
