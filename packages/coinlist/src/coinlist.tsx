import * as React from "react"

type CoinListProps = {
    tokenNames: string[]
}
export const CoinList = ({tokenNames}: CoinListProps) => {
    return <div>this is coin list version {tokenNames.join(',')}</div>
}