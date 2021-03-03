import React, { ComponentPropsWithoutRef, FC } from 'react'

import styles from './FormInput.module.scss'

type Props = ComponentPropsWithoutRef<'input'>

export const FormInput: FC<Props> = props => (
  <input className={styles.input} {...props} />
)
