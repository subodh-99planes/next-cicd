import React, { FC, useState } from 'react'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import { Stepper, Typography } from 'features/components/CoreUI'
import { SurveyElement } from 'utils/types'

import styles from './SurveyPageMeta.module.scss'

interface Props {
  data: SurveyElement
  page: number
  title: string
}

export const SurveyPageMeta: FC<Props> = ({ data, page, title }) => {
  const [ended, updateEnded] = useState(false)

  const choices =
      data?.choices &&
      data.choices.reduce((choices, choice) => ({ ...choices, [choice.value]: choice.text }), {} as { [key: string]: string })


  const onEnded = () => {
    console.log('ended')
    updateEnded(true)
  }


  return (
    <div className={classNames(page === 0 ? styles.baseContainer : styles.surveyMetadata, ended && styles.completed)}>
      {page === 0 ? <Stepper index={page + 1} title={title} /> : null}
      <Typography variant='h2'>{data?.title}</Typography>
      {choices?.image ? (
        <div className={styles.surveyMetaImage}>
          <img src={choices.image} />
        </div>
      ) : null}
      {choices?.video ? (
        <>
          <div className={styles.surveyReactPlayer}>
            <ReactPlayer url={choices.video} controls width='`100%' height='100%' onEnded={onEnded}/>
          </div>
        </>
      ) : null}
      {choices?.audio ? (
        <>
          <div className={styles.surveyReactPlayerAudio}>
            <ReactPlayer url={choices.audio} controls width='`100%' height='100%'/>
          </div>
        </>
      ) : null}
      {choices?.text ? <Typography classList={styles.text}>{choices.text}</Typography> : null}
    </div>
  )
}
