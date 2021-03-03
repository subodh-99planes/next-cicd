import React, { ComponentPropsWithoutRef, Ref, forwardRef } from 'react'
import { colorMapping } from 'utils/survey/colorMapping'

import styles from './Button.module.scss'

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: ColorVariant
  index?: number
}
type ColorVariant =
  | 'yellow'
  | 'red'
  | 'blue'
  | 'purple'
  | 'gradient'
  | 'inverse'
  | 'default'
  | 'disabled'

const Button = forwardRef(
  (
    { variant = 'default', index, className, disabled, ...props }: Props,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        disabled={disabled}
        ref={ref}
        className={`${styles.button} ${
          disabled
            ? styles.disabled
            : index
              ? styles[colorMapping[index].color]
              : styles[variant]
        } ${className}`}
        {...props}
      />
    )
  }
)

export default Button
