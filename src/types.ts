import { Dispatch } from 'react'

export interface SliderProps {
  value: number
  setValue: Dispatch<React.SetStateAction<number>>
  min?: number
  max?: number
  step?: number
  color: string | Array<number>
  defaultColor?: string
  showDotInCircle?: boolean
}

export interface StyledProps {
  value: number
  min: number
  max: number
  step: number
  currentWidth: number
  sliderColor: string | Array<number>
  defaultColor: string
  showDotInCircle: boolean
}

export interface ShadowDotsProps {
  value: number
  width: number
  color: string | Array<number>
  defaultColor: string
}
