import React from 'react'

export type GetImageUrl = (slug: string, width?: number, quality?: number) => string
export const getImageUrl: GetImageUrl = (slug, width?, quality?) => {
	const url = encodeURIComponent(`https://tpp-static.crypto.com/token/icons/${slug}/color_icon.png`)
	return `https://crypto.com/price/_next/image.png?url=${url}&w=${width||48}&q=${quality||75}`
}
export type TokenIconPropsType = {
  slug: string
  width?: number
  quality?: number
}

export const TokenIcon = ({slug, width, quality}: TokenIconPropsType) => {
	return (
		<img
			width='28px'
			height='28px'
			src={getImageUrl(slug, width, quality)}
		/>
	)
}