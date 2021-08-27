import * as React from "react"
import { TokenBlock, TokenBlockPropsType } from './tokenblock'
import { getTokensData } from '@cryptotest/utils'
import { FlexContainer } from '@cryptotest/common'

export type CoinBlocksProps = {
	slugs: string[]
	url?: string
	styles?: any
}
const CoinBlocksContainer = {
	flexDirection: 'row',
	gap: '16px'
}
export const CoinBlocks = (props: CoinBlocksProps) => {
	const {slugs, styles={}, url} = props
	const [tokensData, setTokensData] = React.useState<any[]>([])
	const [isLoading, setLoading] = React.useState(true) 
	React.useEffect(() => {
		async function _getTokensData(slugs: string[]) {
			const data = await getTokensData(slugs, url)
			setTokensData(data)
			setLoading(false)
		}
    _getTokensData(slugs)
	}, [slugs])
	return (
    <>
      {
        isLoading ? <p>isLoading</p> : (
					<FlexContainer styles={{...CoinBlocksContainer, ...styles}}>
						{
							tokensData.map((info:any, index: number) => {
								return <TokenBlock key={index} tokenInfo={info}/>
							})
						}
					</FlexContainer>
				)
      }
    </>
  
	)
}