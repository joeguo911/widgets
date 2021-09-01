import React from 'react'
import { Sparkline, TokenIcon, FlexContainer, 
  WidgetItemPropsType,
  WidgetItemWrapperPropsType
} from "@cryptotest/common"
import { formatPrice, formatPercent } from '@cryptotest/utils'
import './style.css'

export const ListItem = (props: WidgetItemPropsType) => {
  const { tokenInfo } = props
  return (
    <> 
      <TokenIcon slug={tokenInfo.slug} />
      <div className="widget-coinList_listItem">
        <span style={{
          color: 'black',
          marginRight: '8px'
        }}>{tokenInfo.name}</span>
        <span style={{
          color: '#718096'
        }}>{tokenInfo.symbol}</span>
      </div>
      <span style={{marginRight: '16px', display: 'inline-block', fontSize: '18px', fontWeight: 500}}>{formatPrice(tokenInfo.usd_price)}</span>
      <span style={{fontSize: '16px', display: 'inline-block', fontWeight: 500, color: tokenInfo.usd_price_change_24h < 0 ? '#e64b60' : '#1bc4ad'}}>{formatPercent(tokenInfo.usd_price_change_24h)}</span>
      <Sparkline values={tokenInfo.prices}/>
    </>
  )
}