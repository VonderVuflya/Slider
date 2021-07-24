import { useState } from 'react'

import styled from 'styled-components'
import Slider from './Slider'

const Container = styled.div`
  min-height: 100vh;
  padding-top: 45vh;
`

const App: React.FC = () => {
  const [value, setValue] = useState(50)
  const [color, setColor] = useState('#dedede')
  const [isDot, setDot] = useState(true)

  const toggleDot = () => setDot(!isDot)

  return (
    <Container>
      <Slider
        value={value}
        setValue={setValue}
        color={color}
        showDotInCircle={isDot}
      />
      <input
        onChange={e => setValue(parseInt(e.target.value, 10))}
        value={value}
        min='0'
        max='100'
      />
      <input
        type='color'
        value={color}
        onChange={e => setColor(e.target.value)}
      />
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
    </Container>
  )
}

export default App
