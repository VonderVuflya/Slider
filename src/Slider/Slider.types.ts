import { Dispatch, SetStateAction } from 'react'

export interface SliderProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  min?: number
  max?: number
  step?: number
  color: string | Array<number>
  colorCircleDot?: string
  colorDefault?: string
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
  colorSlider: string
  colorCircleDot: string
  colorDefault: string
  showDotInCircle: boolean
  thumbRadius: number
  miniThumbsShow: boolean
}

export interface ShadowDotsProps {
  value: number
  width: number
  color: string
  colorDefault: string
}
