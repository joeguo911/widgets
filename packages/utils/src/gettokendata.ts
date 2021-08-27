import DataCache from './cache'
const tokenSrc = `https://price-api.crypto.com/v1/price/tokens/`

export const getTokenData = async (slug: string, url?: string) => {
  if (DataCache.has(slug)) {
    return DataCache.getDataByslug(slug)
  }
  // return DataCache.getDataByslug(slug) || fetch(`${(url || tokenSrc)}${slug}`)
  const response = await fetch(`${(url || tokenSrc)}${slug}`, {
    method: 'GET'
  })
  const data = await response.json()
  DataCache.setData(slug, data)
  return data
}

export const getTokensData = (slugs: string[], url?: string) => {
  return Promise.all(
    slugs.map(async (name: string) =>
      getTokenData(name, url)
    )
  )
}