import React from 'react'
import { get } from "lodash"
import { getTokensData, useTokenMessageMapBySymbols } from '@cryptotest/utils'
import { FlexContainer } from '../flexcontainer'
import { WidgetItemWrapper } from './widgetitemwrapper'
export type WidgetItemPropsType = {
  tokenInfo: any
}

export type WidgetWraperPropsType = {
  component: React.ComponentType<any>
  slugs: string[]
	url?: string
	styles?: any
	wsUrl?: string
	itemWrapperStyles?: any
}

export const WidgetWraper = (props: WidgetWraperPropsType) => {
  const {slugs, styles={}, url, wsUrl, component: Component, itemWrapperStyles} = props
	const [tokensData, setTokensData] = React.useState<any[]>([])
	const [isLoading, setLoading] = React.useState(true)
	const [symbols, setSymbols] = React.useState<string[]>([])
	React.useEffect(() => {
		async function _getTokensData(slugs: string[]) {
			const data = await getTokensData(slugs, url)
			const symbols = data.map(d => d.symbol)
			setTokensData(data)
			setSymbols(symbols)
			setLoading(false)
		}
    _getTokensData(slugs)

	}, [slugs])
	const tokenMessageMap = useTokenMessageMapBySymbols(symbols)
  return (
    <>
      {
        isLoading ? <p>isLoading</p> : (
					<FlexContainer styles={{...styles}}>
						{
							tokensData.map((info:any, index: number) => {
								info.usd_price = get(tokenMessageMap, [info.symbol, 'usd_price']) || info.usd_price
								return (
                  <WidgetItemWrapper key={index} slug={info.slug} styles={itemWrapperStyles}>
                    <Component tokenInfo={info}/>
                  </WidgetItemWrapper>
                )
							})
						}
					</FlexContainer>
				)
      }
    </>
  )
}