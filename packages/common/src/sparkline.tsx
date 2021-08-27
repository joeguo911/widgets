import React, { memo } from 'react'

export type SparklineProps = {
  values: number[]
  width?: number
  height?: number
  priceUpColor?: string
  priceDownColor?: string
}
const _Sparkline = ({
  values,
  width=110,
  height=30,
  priceUpColor='#1bc4ad',
  priceDownColor='#e64b60'
}: SparklineProps) => {
  
  const stroke =
    values[values.length - 1] >= values[0]
      ? priceUpColor
      : priceDownColor

  const ys: number[] = []
  let yMin = Infinity
  let yMax = 0

  values.forEach((value) => {
    if (yMin > value) yMin = value
    if (yMax < value) yMax = value
    ys.push(value)
  })

  const pointCount = ys.length
  const points: [number, number][] = ys.map((y, index) => {
    const px = (width / pointCount) * index
    const py = height - ((y - yMin) / (yMax - yMin)) * height
    return [px, py]
  })

  const polylinePoints = points.reduce(
    (acc, point) => `${acc} ${point.join(',')}`,
    ''
  )

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={height}
    >
      <polyline
        points={polylinePoints}
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}

export const Sparkline = memo(_Sparkline)
