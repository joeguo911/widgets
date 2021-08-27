export const formatPrice = (price: number) =>{
  if (Math.abs(price) >= 1) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
  // in case the result likes 0.1230
  return '$' + (Number(price.toFixed(12))).toLocaleString('zh', {maximumSignificantDigits: 4}).replace(/0+$/g, '')
}

export const formatPercent = (price: number, precision?: number) => {
  return `${price >= 0 ? '+' : ''}${(price * 100).toFixed(precision || 2)}%`
}