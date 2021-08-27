import * as React from "react"

type CoinListProps = {
    slugs: string[]
}
export const CoinList = ({slugs}: CoinListProps) => {
    return <div>this is coin list version {slugs.join(',')}</div>
}