import React from 'react'

export type MarqueePropsType = {
  children: React.ReactNode
}

export const MarqueeWrapper = ({children}: MarqueePropsType) => {
  const marqueeEl = React.useRef(null)
  const moveToLeft = ()=> {

  }

  const stop = () => {

  }

  return (
    <div ref={marqueeEl}>
      {
        children
      }
    </div>
  )
}