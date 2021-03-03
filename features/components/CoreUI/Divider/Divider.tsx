import React, { FC } from 'react'

import styles from './Divider.module.scss'

interface Props {
  text?: string
}

export const Divider: FC<Props> = ({ text }) =>
  !text ? (
    <div className={styles.divider}>
      <hr />
    </div>
  ) : (
    <div className={styles.divider}>
      <hr />
      <span>or</span>
      <hr />
    </div>
  )
