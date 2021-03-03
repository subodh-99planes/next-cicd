import React, { ComponentPropsWithoutRef, Ref, forwardRef } from 'react'

import styles from './SocialButton.module.scss'

type Props = ComponentPropsWithoutRef<'button'> & { variant?: SocialVariant, styleClass?: string }

type SocialVariant = 'facebook' | 'google'

export const SocialButton = forwardRef(
  (
    { variant = 'google', styleClass = '', ...props }: Props,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => (
    <button
      ref={ref}
      className={`${styles.button} ${styles[variant]} ${styleClass}`}
      {...props}
    >
      <img src={`/static/icons/${variant}.svg`} />
      {variant}
    </button>
  )
)
