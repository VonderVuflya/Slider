import { useState } from 'react'

import styled from 'styled-components'
import Slider from './Slider'

import { rgbToHex } from './utils/helpers'

// const palete = {
//   1: '#e8e8db',
//   2: '#ffdf65',
//   3: '#858377',
//   4: '#636057',
//   5: '#494846',
// }

const SliderBlock = styled.div`
  width: 600px;
  /* height: 100px; */
  padding: 60px 40px;
  box-sizing: border-box;
  background-color: rgb(40, 44, 52);
  border-radius: 12px;
`

const ParamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  margin-top: 20px;
  margin-right: 20px;

  span {
    margin-bottom: 8px;
  }
`

const App: React.FC = () => {
  const [value, setValue] = useState(50)
  const [color, setColor] = useState('#ffdf65')
  const [circleDotColor, setCircleDotColor] = useState('#858377')
  const [isDot, setDot] = useState(true)
  const [isMiniThumbs, setMiniThumbs] = useState(false)
  const [thumbRadius, setThumbRadius] = useState(50)

  const toggleDot = () => setDot(!isDot)
  const toggleMinDots = () => setMiniThumbs(!isMiniThumbs)

  return (
    <>
      <h1>Slider</h1>

      <SliderBlock>
        <Slider
          value={value}
          setValue={setValue}
          color={color}
          min={10}
          max={100}
          step={10}
          circleDotColor={circleDotColor}
          showDotInCircle={isDot}
          thumbRadius={thumbRadius}
          miniThumbsShow={isMiniThumbs}
        />
      </SliderBlock>

      <ParamsContainer>
        <Block>
          <span>Value</span>
          <input
            onChange={e => setValue(parseInt(e.target.value, 10))}
            value={value}
            min='0'
            max='100'
          />
        </Block>

        <Block>
          <span>Main color</span>
          <input
            type='color'
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <input
            type='text'
            value={rgbToHex(color)}
            onChange={e => setColor(e.target.value)}
          />
        </Block>

        <Block>
          <span>Dot color</span>
          <input
            type='color'
            value={circleDotColor}
            onChange={e => setCircleDotColor(e.target.value)}
          />
        </Block>

        <Block>
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
        </Block>

        <Block>
          <span>Show dots</span>
          <input
            type='checkbox'
            onClick={toggleMinDots}
            checked={isMiniThumbs}
          />
        </Block>
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
      </ParamsContainer>
    </>
  )
}

export default App
