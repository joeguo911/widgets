import React, { ReactNode } from 'react'

export type FlexContainerPropsType = {
	children: ReactNode
	styles?: any,
	click?: any
}

export const FlexContainer = (props: FlexContainerPropsType) => {
	const {children, styles = {}, click=()=>{} } = props
	return (
		<div style={{'display': 'flex', ...styles}} onClick={click}>
			{children}
		</div>
	)
}