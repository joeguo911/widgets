export const openTokenDetailPage = (slug:string, url?: string) => {
  const source = encodeURIComponent(url || location.origin)
  window.open(`https://crypto.com/price/bitcoin?utm_medium=widget&utm_campaign=CoinList&utm_source=${source}&utm_content=${slug}`)
}