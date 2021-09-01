import React from 'react'
import { Sparkline, TokenIcon, FlexContainer } from "@cryptotest/common"
import { formatPrice, formatPercent } from '@cryptotest/utils'

export type CointickerItemPropsType = {
	tokenInfo: any,
	width?: number,
	height?: number
}

export const CointickerItem = (props: CointickerItemPropsType) => {
	const { tokenInfo, width, height } = props
	return (
		<>
      <TokenIcon slug={tokenInfo.slug} />
      <Sparkline values={tokenInfo.prices} width={width} height={height} />
			<FlexContainer styles={{fontSize: '16px', display: 'flex', margin: '8px 0', height: '27px', alignItems: 'center'}}>
				<span style={{
					color: 'black',
					marginRight: '8px'
				}}>{tokenInfo.name}</span>
				<span style={{
					color: '#718096'
				}}>{tokenInfo.symbol}</span>
			</FlexContainer>
			<FlexContainer styles={{height: '27px', alignItems: 'center'}}>
				<span style={{marginRight: '16px', display: 'inline-block', fontSize: '18px', fontWeight: 500}}>{formatPrice(tokenInfo.usd_price)}</span>
				<span style={{fontSize: '16px', display: 'inline-block', fontWeight: 500, color: tokenInfo.usd_price_change_24h < 0 ? '#e64b60' : '#1bc4ad'}}>{formatPercent(tokenInfo.usd_price_change_24h)}</span>
			</FlexContainer>
		</>
	)
}