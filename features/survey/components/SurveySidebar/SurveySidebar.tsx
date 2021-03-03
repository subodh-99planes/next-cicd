import React, { FC } from 'react'

import { Stepper, Typography } from 'features/components/CoreUI'
import Button from 'features/components/CoreUI/Button/Button'
import { labels } from 'utils/localeConfig/en'

import styles from './SurveySidebar.module.scss'

interface Props {
  subPage: number
  page: number
  title: string
  description: string
  handleBackClick: () => void
}

export const SurveySidebar: FC<Props> = ({ page, title, description, handleBackClick, subPage }) => (
  <>
    <div className={styles.sidebarSurvey}>
      <Stepper index={page + 1} title={title} />
      <Typography variant='h1'>{description}</Typography>
    </div>
    {subPage === 0 ? null : (
      <div className={styles.backButton}>
        <Button variant='inverse' onClick={handleBackClick}>
          <img src='/static/icons/left-arrow.svg' />
          {labels.survey.back}
        </Button>
      </div>
    )}
  </>
)
