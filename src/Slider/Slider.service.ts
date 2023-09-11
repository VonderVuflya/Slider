import chunk from 'lodash/chunk'

import { ShadowDotsProps } from './Slider.types'

// corrector – ширина точки
// w1 – длина/расстояния одного деления (позиция последней точки(ширина) / 9)
const w1 = (width: number) => width / 9

const privateMethods = {
  normalizeColor(color: string) {
    const colorValue = color.includes('#') ? color.slice(1) : color
    if (colorValue.length === 3) {
      const twiceColors = chunk(colorValue, 1)
        .map(el => `${el}${el}`)
        .join('')
      return `#${twiceColors}`
    }
    return color
  },
  getShadowArray(width: number, colorDefault: string) {
    // @NOTE: так как первая точка у нас уже нарисована, осталось нарисовать всего 9 точек
    // поэтому рисуем их со смещением от первой точки (+ segmentWidth)
    return [...Array(9)].map((_, index) => {
      const segmentWidth = w1(width)
      const dotPosition = index * segmentWidth + segmentWidth
      return `${dotPosition}px 0 0 ${colorDefault}`
    })
  },
}

const sliderService = {
  chosenNumber(value: number) {
    return value / 10 - 1
  },
  getShadowDots({
    value,
    width,
    color,
    colorDefault,
  }: ShadowDotsProps): string {
    const number = this.chosenNumber(value)
    const shadows = privateMethods.getShadowArray(width, colorDefault)
    const updatedShadow = shadows.map((shadow, index) => {
      if (index < number) return shadow.replace(colorDefault, color)
      return shadow
    })
    return updatedShadow.join(', ')
  },
  setDotPosition(width: number, value: number, sliderHeight: number) {
    // valueNumber – на какой позиции мы находимся от 1 до 10
    const valueNumber = value / 10
    const segmentWidth = w1(width)
    const dotPosition =
      valueNumber * segmentWidth - segmentWidth - (sliderHeight * 2 - 0.5)
    if (valueNumber === 1) return dotPosition
    return dotPosition
  },
  getBgColor(value: number, color: string) {
    const valueTotalRatio = (val: number, min: number, max: number) => {
      return ((val - min) / (max - min)).toFixed(2).toString()
    }

    const getLinearGradientCSS = (
      ratio: string,
      leftColor: string,
      rightColor: string
    ) => {
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

    return getLinearGradientCSS(ratio, color, '#e5e5e5')
  },
  hexToRgb(value: string | Array<number>, opacity?: number) {
    const getColor = (color: string) => {
      const correctColor = privateMethods.normalizeColor(color)

      const [r, g, b] = chunk(correctColor.slice(1), 2)
        .map(el => el.join(''))
        .map(el => parseInt(el, 16))
      if (opacity) return `rgba(${r}, ${g}, ${b}, ${opacity})`
      return `rgb(${r}, ${g}, ${b})`
    }

    if (Array.isArray(value)) {
      const [r, g, b] = value
      if (opacity) return `rgba(${r}, ${g}, ${b}, ${opacity})`
      return `rgb(${r}, ${g}, ${b})`
    }
    return getColor(value)
  },
  rgbToHex(rgb: string) {
    if (rgb.includes('#')) return rgb

    const correctRgbArray = rgb
      .slice(4)
      .split(')')[0]
      .split(', ')
      .map(el => +el)

    const hex = correctRgbArray
      .map(el => el.toString(16).padStart(2, '0'))
      .join('')
    return `#${hex}`
  },
}

export default sliderService
