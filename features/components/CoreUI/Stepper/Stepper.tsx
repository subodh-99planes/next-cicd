import React, { FC } from 'react'
import { Typography } from 'features/components/CoreUI'

import styles from './Stepper.module.scss'
import { colorMapping } from 'utils/survey/colorMapping'

type Color = 'yellow' | 'red' | 'blue' | 'purple' | 'default'

interface Props {
  index: number
  title: string
}

const stepperKeys = Object.keys(colorMapping).map(id => +id)

export const Stepper: FC<Props> = ({ index, title }) => (
  <div className={styles.container}>
    <Typography classList={styles.text}>
      {`Part ${colorMapping[index].text}: `}
      <strong>{title}</strong>
    </Typography>
    <div className={styles.stepper}>
      {stepperKeys.map(key => {
        const color:Color = key <= index ? colorMapping[key].color : 'default'

        return <div className={`${styles.steps} ${styles[color]}`} key={key} />
      })}
    </div>
  </div>
)
