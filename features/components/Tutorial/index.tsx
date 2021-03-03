import { SurveyCard } from 'features/survey/components'
import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { labels } from 'utils/localeConfig/en'
import { Typography } from '../CoreUI'
import FlexContainer from '../CoreUI/FlexContainer/FlexContainer'
import styles from './Tutorial.module.scss'
import Button from '../CoreUI/Button/Button'
import { useWindowSize } from 'features/hooks'
import { getFromStorage, updateStorage } from 'features/util/localStorage'
import { mobileWidth, tutorialStatus } from 'utils/consts'

const OptionsCoachMark = () => (<FlexContainer direction='col' classlist={classNames(styles.coachMark, styles.options)}>
  <Typography classList={styles.handWritten} variant='p'>{labels.tutorial.options}</Typography>
  <img className={styles.icon} src={`/static/icons/arrow_down.svg`} />
</FlexContainer>)

const QuestionCoachMark = () => (<FlexContainer direction='col' classlist={classNames(styles.coachMark, styles.question)}>
  <img className={styles.icon} src={`/static/icons/arrow_up.svg`} />
  <Typography classList={styles.handWritten} variant='p'>{labels.tutorial.question}</Typography>
</FlexContainer>)

const PrevCoachMark = () => (<FlexContainer direction='col' classlist={classNames(styles.coachMark, styles.leftSwipe)}>
  <img className={styles.icon} src={`/static/icons/swipe-left.svg`} />
  <Typography classList={styles.handWritten} variant='p'>{labels.tutorial.prev}</Typography>
</FlexContainer>)

const NextCoachMark = () => (<FlexContainer direction='col' classlist={classNames(styles.coachMark, styles.rightSwipe)}>
  <img className={styles.icon} src={`/static/icons/swipe-right.svg`} />
  <Typography classList={styles.handWritten} variant='p'>{labels.tutorial.next}</Typography>
</FlexContainer>)

const Tutorial:FC = () => {
  const { width } = useWindowSize()

  const tutorialCompleted = getFromStorage(tutorialStatus)
  const [showTutorial, updateShowTutorial] = useState(!tutorialCompleted && !!width && width <= mobileWidth)

  useEffect(() => {
    if (!width) return
    updateShowTutorial(width <= mobileWidth && !tutorialCompleted)
  }, [width, tutorialCompleted, updateShowTutorial])


  const closeTutorial = () => {
    updateShowTutorial(false)
    updateStorage(tutorialStatus, 'true')
  }


  return (
    <FlexContainer direction='col' classlist={classNames(styles.container, showTutorial && styles.visible)} justify='center'>
      <SurveyCard classlist={styles.surveyCard}>
        <img className={styles.mockImage} src={`/static/images/survey_mock_question.png`}/>
        <OptionsCoachMark/>
        <QuestionCoachMark/>
        <PrevCoachMark/>
        <NextCoachMark/>
      </SurveyCard>
      <Button className={classNames(styles.completeBtn, styles.handWritten)} onClick={closeTutorial}>
        {labels.tutorial.complete}
      </Button>
    </FlexContainer>
  )
}


export default Tutorial
