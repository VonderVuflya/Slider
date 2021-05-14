import React, { useState } from 'react'

import styled from 'styled-components';
import Slider from './Slider'

const Container = styled.div`
  min-height: 100vh;
  padding-top: 45vh;
`;


function App() {
  const [value, setValue] = useState(50);
  return (
    <Container>
      <Slider
        value={value}
        setValue={setValue}
        color={[97, 175, 239]}
      />
    </Container>
  );
}

export default App;
