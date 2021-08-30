import { useEffect, useState } from 'react'

type Topic = 'token_price'
let subscribeID = 0
const url = `wss://price-api.crypto.com/v1/ws`

export function useWSMessage<T>({
  topic,
  shouldSubscribe=true,
  subscribeParams,
  wsUrl
}: {
  topic: Topic
  wsUrl?: string
  subscribeParams: {
    [key: string]: any
  }
  shouldSubscribe: boolean
}) {
  const [message, setMessage] = useState<T | undefined>()

  useEffect(() => {
    if (!shouldSubscribe) return

    const socket = new WebSocket(wsUrl || url)
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'subscribe',
          id: subscribeID++,
          params: {
            topic,
            ...subscribeParams,
          },
        })
      )
    }

    socket.onmessage = (event: MessageEvent) => {
      try {
        const jsonData = JSON.parse(event.data)
        if (jsonData.result.data) {
          setMessage(jsonData.result.data)
        }
      } catch (e) {
        console.warn(e)
      }
    }

    return () => {
      if (socket.readyState === socket.OPEN) {
        socket.send(
          JSON.stringify({
            jsonrpc: '2.0',
            method: 'unsubscribe',
            params: {
              topic,
            },
          })
        )
      }
      socket.close()
    }
  }, [topic, shouldSubscribe, subscribeParams])

  return message
}
