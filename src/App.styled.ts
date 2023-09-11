import styled from 'styled-components'

// const palete = {
//   1: '#e8e8db',
//   2: '#ffdf65',
//   3: '#858377',
//   4: '#636057',
//   5: '#494846',
// }

export const SliderBlock = styled.div`
  width: 600px;
  /* height: 100px; */
  padding: 60px 40px;
  box-sizing: border-box;
  background-color: rgb(40, 44, 52);
  border-radius: 12px;
`

export const ParamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 600px;
`

export const Block = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;

  input {
    width: 80px;
  }
`
