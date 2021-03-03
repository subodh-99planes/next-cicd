import React from 'react'
import { ErrorMessage as ErrMsg } from '@hookform/error-message'

import styles from './FormFieldError.module.scss'

type Props = React.ComponentProps<typeof ErrMsg>

export const ErrorMessage: React.FC<Props> = props => (
  <ErrMsg
    {...props}
    render={({ message }) => (
      <div className={styles.error}>
        <span className={styles.text} role='alert'>{message}</span>
      </div>
    )}
  />
)
