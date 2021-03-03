import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './FormInput.module.scss'
import Input from '../Input/Input'
import Label from '../Label/Label'

interface Props {
  /**
   * Input value type
   */
  type?: 'text' | 'number' | 'email' | 'password';

  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Label to show above input
   */
  label: string;

  /**
   * Placeholder to show when empty
   */
  placeholder?: string;

  /**
   * Register callback for change event
   */
  onChange?: (e: any) => void;

  /**
   * Register callback for blur event
   */
  onBlur?: (e: any) => void;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Stretch to max width. Default: false
   */
  fillWidth?: boolean;

  /**
   * Current value of input
   */
  value?: string;

  /**
   * Displays error msg underneath the input field
   */
  error?: string;

  /**
   * Classnames to apply
   */
  inputClassname?: string;

  /**
   * tab index
   */
  tabIndex?: number;

  /**
   * auto focus
   */
  autoFocus?: boolean;

}

const FormInput: FC<Props> = props => {
  const { fillWidth, disabled, label, error, inputClassname = '', tabIndex, ...otherProps } = props

  const errorLabel = error && (
    <div className={styles.errorLabel}>
      {error}
    </div>
  )

  return (
    <Label tabIndex={tabIndex} title={label} disabled={disabled} className={classNames(styles.label, { [styles.fillWidth]: fillWidth })}>
      <Input
        error={!!error}
        fillWidth={fillWidth}
        disabled={disabled}
        className={inputClassname}
        {...otherProps}
      />
      {errorLabel}
    </Label>
  )
}

export default FormInput
