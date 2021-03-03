import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'
import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './SurveyCard.module.scss'

interface Props {
  classlist?: string
}

export const SurveyCard: FC<Props> = ({ children, classlist }) => (
  <FlexContainer align='start' classlist={classNames(styles.card, classlist)}>{children}</FlexContainer>
)
