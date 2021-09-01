import * as React from "react"
import { WidgetWraper, WidgetWraperPropsType } from '@cryptotest/common'
import { MarqueeItem } from './marqueeitem'
import { MarqueeWrapper } from './marqueewrapper'
export type MarqueePropsType = Omit<WidgetWraperPropsType, 'component'>

export const Marquee = (props: MarqueePropsType) => {
  return (
    <MarqueeWrapper>
      <WidgetWraper {...props} 
        styles={{flexDirection: 'column', display: 'inline-flex'}} 
        component={MarqueeItem}
      />
    </MarqueeWrapper>
  )
   
}