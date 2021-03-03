import React, { FC, Ref, RefObject } from 'react'

import styles from './Main.module.scss'
import FlexContainer from '../FlexContainer/FlexContainer'

type MainProps = {children: React.ReactNode, parentRef?: Ref<HTMLDivElement>}


export const Main = ({
  children,
  parentRef
}: MainProps): JSX.Element => (<FlexContainer ref={parentRef as RefObject<HTMLDivElement>} classlist={styles.main} align='start'>{ children }</FlexContainer>)

const Sidebar: FC = ({ children }) => (
  <div className={styles.sidebar}>{children}</div>
)

const Content: FC = ({ children }) => (
  <FlexContainer align='end' justify='spaceBetween' classlist={styles.content} direction='col'>{children}</FlexContainer>
)

const Slider: FC = ({ children }) => (
  <FlexContainer classlist={styles.slider} align='start'>{children}</FlexContainer>
)

const Footer: FC = ({ children }) => (
  <FlexContainer justify='end' classlist={styles.footer}>{children}</FlexContainer>
)


Main.Slider = Slider
Main.Sidebar = Sidebar
Main.Content = Content
Main.Footer = Footer
