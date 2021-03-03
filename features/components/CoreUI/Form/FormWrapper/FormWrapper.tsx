import React from 'react'

import { FormLabel } from '../FormLabel'
import { ErrorMessage } from '../FormFieldError'
import styles from './FormWrapper.module.scss'

type ErrorMessageProps = React.ComponentProps<typeof ErrorMessage>

interface Props {
  label?: string
  errors: ErrorMessageProps['errors']
  name: string
}

export const FormWrapper: React.FC<Props> = ({
  children,
  label,
  name,
  errors,
  ...props
}) => (
  <div {...props} className={styles.container}>
    {!label ? null : (
      <FormLabel>{label}</FormLabel>
    )}
    {children}
    <ErrorMessage errors={errors} name={name} />
  </div>
)
