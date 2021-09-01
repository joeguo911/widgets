import React, { ReactNode } from 'react'
import './style.css'
export type FlexContainerPropsType = {
	children: ReactNode
	styles?: any,
	click?: any
}

export const FlexContainer = (props: FlexContainerPropsType) => {
	const {children, styles = {}, click=()=>{} } = props
	return (
		<div className='widget_common-flex-container' style={styles} onClick={click}>
			{children}
		</div>
	)
}