import { throttle } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useWSMessage } from './useWSMessage'

export type TokenMessage ={
  usd_price: number
  usd_marketcap: number
  usd_price_change_24h: number
  usd_volume_24h: number
  symbol: string
}
// For the sake of performance, WS server uses acronym for field names
type _TokenMessage = {
  // symbol
  s: string
  // timestamp
  t: number
  // price
  p: number
  // usd_price_change_24h
  p24: number
  // usd_volume_24h
  v24: number
  // usd_marketcap
  mc: number
}

type TokenMessageMap = { [key: string]: TokenMessage }

export const useTokenMessageMapBySymbols = (
  symbols: string[],
  wsUrl?: string
): TokenMessageMap => {
  const [tokenMessageMap, updateTokenMessageMap] = useState<TokenMessageMap>({})
  const cachedTokenMessageMapRef = useRef<TokenMessageMap>({})
  const previousSymbolsRef = useRef<{ symbols: string[] } | undefined>(
    undefined
  )

  // WS frequently pushes token messages, which cause react to rerender frequently.
  // By default react would rerender function component once state changes. We need to memo
  // the react components that uses this hook to avoid unnecessary rendering.

  // It's important to memorize subscribeParams
  const subscribeParams = useMemo(() => {
    if (
      // If the symbols we need to subscribe are not changed, return the same
      // subscribeParams object so that useWSMessage won't unsubscribe the symbols
      // and then subscribe to the same symbols.
      previousSymbolsRef.current &&
      previousSymbolsRef.current.symbols.join('') === symbols.join('')
    ) {
      return previousSymbolsRef.current
    }

    previousSymbolsRef.current = { symbols }
    return previousSymbolsRef.current
  }, [symbols])

  const tokenMessage = useWSMessage<_TokenMessage>({
    topic: 'token_price',
    shouldSubscribe: symbols.length > 0,
    subscribeParams,
    wsUrl
  })

  // Throttle update for rendering performance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTokenMessageMapThrottled = useCallback(
    throttle(() => {
      updateTokenMessageMap({ ...cachedTokenMessageMapRef.current })
    }, 1000),
    []
  )

  useEffect(() => {
    if (!tokenMessage) return

    const { s, p, p24, mc, v24 } = tokenMessage

    cachedTokenMessageMapRef.current[s] = {
      symbol: s,
      usd_price: p,
      usd_marketcap: mc,
      usd_volume_24h: v24,
      usd_price_change_24h: p24,
    }

    updateTokenMessageMapThrottled()
  }, [tokenMessage, updateTokenMessageMapThrottled])

  return tokenMessageMap
}
