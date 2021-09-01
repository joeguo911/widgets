import * as React from "react"
import { WidgetWraper, WidgetWraperPropsType } from '@cryptotest/common'
import { CointickerItem } from './cointickeritem'
export type CointickerPropsType = Omit<WidgetWraperPropsType, 'component'>

export const Cointicker = (props: CointickerPropsType) => {
  return (
      <WidgetWraper {...props} 
        styles={{flexDirection: 'column', display: 'inline-flex'}} 
        component={CointickerItem}
      />
  )
   
}