import { Typography } from 'features/components/CoreUI'
import React, { FC } from 'react'

import { labels } from 'utils/localeConfig/en'

import styles from './SurveySidebarLanding.module.scss'

export const SurveySidebarLanding: FC = () => (
  <div className={styles.sidebarLanding}>
    <Typography classList={styles.text}>
      {labels.landing.sidebarText.line1} <br />
      {labels.landing.sidebarText.line2}
    </Typography>
  </div>
)
