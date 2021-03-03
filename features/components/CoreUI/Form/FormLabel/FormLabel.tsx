import React, { ComponentPropsWithoutRef, FC } from 'react'

import styles from './FormLabel.module.scss'

type Props = ComponentPropsWithoutRef<'label'>

export const FormLabel: FC<Props> = props => (
  <label className={styles.label} {...props} />
)
