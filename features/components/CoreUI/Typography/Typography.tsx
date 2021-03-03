import React, { FC } from 'react'
import styles from './Typography.module.scss'
import classNames from 'classnames'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface Props {
  variant?: TypographyVariant
  classList?: string
}

export const Typography: FC<Props> = ({
  variant = 'p',
  children,
  classList,
  ...props
}) => {
  const Component = variant || 'p'

  const classes = classNames(styles[variant], classList)

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
