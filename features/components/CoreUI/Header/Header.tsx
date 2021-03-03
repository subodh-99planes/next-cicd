import React, { FC } from 'react'

import { Logo } from '../Logo/Logo'
import styles from './Header.module.scss'

export const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.logoContainer}>
      <Logo />
    </div>
    <div className={styles.cta} />
  </header>
)
