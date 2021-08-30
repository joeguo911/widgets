import * as React from "react"
import { get } from "lodash"
import { FlexContainer } from '@cryptotest/common'
import { getTokensData, useTokenMessageMapBySymbols } from '@cryptotest/utils'
import { TokenBlock } from './tokenblock'

export type CoinBlocksProps = {
	slugs: string[]
	url?: string
	styles?: any
	wsUrl?: string
}
const CoinBlocksContainer = {
	flexDirection: 'row',
	gap: '16px'
}
export const CoinBlocks = (props: CoinBlocksProps) => {
	const {slugs, styles={}, url, wsUrl} = props
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
					<FlexContainer styles={{...CoinBlocksContainer, ...styles}}>
						{
							tokensData.map((info:any, index: number) => {
								info.usd_price = get(tokenMessageMap, [info.symbol, 'usd_price']) || info.usd_price
								return <TokenBlock key={index} tokenInfo={info}/>
							})
						}
					</FlexContainer>
				)
      }
    </>
  
	)
}