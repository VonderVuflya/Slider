import { Dispatch } from 'react'

export interface SliderProps {
  value: number
  setValue: Dispatch<React.SetStateAction<number>>
  min?: number
  max?: number
  step?: number
  color: string | Array<number>
  circleDotColor?: string
  defaultColor?: string
  showDotInCircle?: boolean
  thumbRadius?: number
  miniThumbsShow?: boolean
}

export interface StyledProps {
  value: number
  min: number
  max: number
  step: number
  currentWidth: number
  sliderColor: string
  circleDotColor: string
  defaultColor: string
  showDotInCircle: boolean
  thumbRadius: number
  miniThumbsShow: boolean
}

export interface ShadowDotsProps {
  value: number
  width: number
  color: string
  defaultColor: string
}
