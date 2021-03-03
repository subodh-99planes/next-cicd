import React, { FC } from 'react'

import styles from './Progress.module.scss'
import FlexContainer from '../FlexContainer/FlexContainer'
import { Typography } from '../Typography'

interface Props {
  subPageTotal: number
  currentSubPageCount: number
}

export const Progress: FC<Props> = ({ subPageTotal, currentSubPageCount }) => (
  <FlexContainer align='end' direction='col'>
    <Typography>{`${currentSubPageCount} of ${subPageTotal}`}</Typography>
    <div className={styles.progress}>
      <div style={{ width: `${(currentSubPageCount / subPageTotal) * 100}%` }} />
    </div>
  </FlexContainer>
)
