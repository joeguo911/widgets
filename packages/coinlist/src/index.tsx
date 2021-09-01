import * as React from "react"
import { WidgetWraper, WidgetWraperPropsType } from '@cryptotest/common'
import { ListItem } from './listitem'

export type CoinListProps = Omit<WidgetWraperPropsType, 'component'>

export const CoinList = (props: CoinListProps) => {
  return <WidgetWraper {...props} 
    styles={{flexDirection: 'column'}} 
    component={ListItem}
    itemWrapperStyles={{
      borderTop: '1px solid #77777730',
      borderBottom: '1px solid #77777730',
      alignItems: 'center'
    }}
  />

}