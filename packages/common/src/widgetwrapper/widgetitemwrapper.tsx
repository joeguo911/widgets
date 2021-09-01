import React from 'react'
import { FlexContainer } from '../flexcontainer'
import { openTokenDetailPage } from '@cryptotest/utils'

export type WidgetItemWrapperPropsType = {
  children: React.ReactNode
  slug: string
  styles?: any
  tokenDetailPageUrl?: string
}

export const WidgetItemWrapper = ({children, slug, styles={}, tokenDetailPageUrl}: WidgetItemWrapperPropsType) => {
  return <FlexContainer styles={styles} click={() => openTokenDetailPage(slug, tokenDetailPageUrl)}>{ children }</FlexContainer>
}