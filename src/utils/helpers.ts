import chunk from 'lodash/chunk'
import { ShadowDotsProps } from '../types'

const hexToRgb = (value: string | Array<number>, opacity?: number): string => {
  const getColor = (color: string) => {
    const [r, g, b] = chunk(color.slice(1), 2)
      .map(el => el.join(''))
      .map(el => parseInt(el, 16))
    if (opacity) return `rgba(${r}, ${g}, ${b}, ${opacity})`
    return `rgb(${r}, ${g}, ${b})`
  }

  // const rgbToHex = rgb => {
  //   const hex = rgb.map(el => el.toString(16).padStart(2, '0')).join('')
  //   return `#${hex}`
  // }

  if (Array.isArray(value)) {
    const [r, g, b] = value
    if (opacity) return `rgba(${r}, ${g}, ${b}, ${opacity})`
    return `rgb(${r}, ${g}, ${b})`
  }
  return getColor(value)
}

// w1 – длина/расстояния одного деления
// corrector – ширина точки
// wLast – позиция последней точки
const corrector = 6
const wLast = (width: number) => width - corrector
const w1 = (width: number) => wLast(width) / 9

const chosenNumber = (value: number): number => value / 10 - 1

const getShadowArray = (width: number, defaultColor: string) => {
  const shadows = [...Array(9)].map((el, index) => {
    const dotPosition = index * w1(width) + w1(width)
    return `${dotPosition}px 0 0 ${defaultColor}`
  })
  return shadows
}

const getShadowDots = ({
  value,
  width,
  color,
  defaultColor,
}: ShadowDotsProps): string => {
  const number = chosenNumber(value)
  const shadows = getShadowArray(width, defaultColor)
  const trueColor = hexToRgb(color)
  const updatedShadow = shadows.map((shadow, index) => {
    if (index < number) return shadow.replace(defaultColor, trueColor)
    return shadow
  })
  return updatedShadow.join(', ')
}

const setDotPosition = (width: number, value: number): number => {
  // valueNumber – на какой позиции мы находимся от 1 до 10
  const valueNumber = value / 10
  const dotPosition = valueNumber * w1(width) - w1(width) - 8
  if (valueNumber === 1) return dotPosition
  return dotPosition
}

const getBgColor = (value: number, color: string | Array<number>): string => {
  function valueTotalRatio(val: number, min: number, max: number) {
    return ((val - min) / (max - min)).toFixed(2).toString()
  }

  function getLinearGradientCSS(
    ratio: string,
    leftColor: string,
    rightColor: string
  ) {
    return [
      '-webkit-gradient(',
      'linear, ',
      'left top, ',
      'right top, ',
      `color-stop(${ratio}, ${leftColor}), `,
      `color-stop(${ratio}, ${rightColor})`,
      ')',
    ].join('')
  }
  const ratio = valueTotalRatio(value, 10, 100)
  const trueColor = hexToRgb(color)

  return getLinearGradientCSS(ratio, trueColor, '#e5e5e5')
}

export { getShadowDots, chosenNumber, setDotPosition, getBgColor, hexToRgb }
