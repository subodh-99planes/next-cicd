import React, { FC, ReactNode, Ref, forwardRef } from 'react'
import classNames from 'classnames'

import styles from './FlexContainer.module.scss'

export type flexJustify =
  | 'end'
  | 'spaceEven'
  | 'spaceAround'
  | 'spaceBetween'
  | 'center'
  | 'start'
export type flexDirection = 'row' | 'col'
export type flexAlign = 'start' | 'end'

interface Props {
  direction?: flexDirection
  fill?: boolean
  classlist?: string
  children: ReactNode
  justify?: flexJustify
  align?: flexAlign
  wrap?: boolean
  ref?: Ref<HTMLDivElement>
}

const FlexContainer: FC<Props> =  forwardRef((props, ref) => {
  const {
    direction = 'row',
    fill,
    classlist,
    justify,
    align,
    wrap = false,
    children,
  } = props
  const classes = classNames(
    styles.flexContainer,
    styles[direction],
    justify && styles[justify],
    fill && styles.fill,
    {
      [styles.alignStart]: align === 'start',
      [styles.alignEnd]: align === 'end',
      [styles.wrap]: wrap,
    },
    classlist
  )
  return <div ref={ref} className={classes}>{children}</div>
})

FlexContainer.defaultProps = {
  direction: 'row',
}

export default FlexContainer
