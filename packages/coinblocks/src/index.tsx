import * as React from "react"
import { WidgetWraper, WidgetWraperPropsType } from '@cryptotest/common'
import { TokenBlock } from './blockitem'

export type CoinBlocksProps = Omit<WidgetWraperPropsType, 'component'>
export const CoinBlocks = (props: CoinBlocksProps) => {
	return <WidgetWraper {...props} component={TokenBlock}/>
}