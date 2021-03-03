import React, { FC } from 'react'
import classNames from 'classnames'
import { colorMapping } from 'utils/survey/colorMapping'
import { SurveyData } from 'utils/types'
import { FormInput, Typography } from 'features/components/CoreUI'

import styles from './SurveyAnswers.module.scss'
import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'

interface Props {
  index: number
  choices: SurveyData['pages'][number]['elements'][number]['choices']
  answer: string
  handleSelect: React.ChangeEventHandler<HTMLInputElement>
}

export const SurveyAnswers: FC<Props> = ({
  index,
  choices,
  answer,
  handleSelect,
}) => (
  <div className={styles.wrapper}>
    {choices &&
      choices.map(({ text, value }) => {
        const checked = value === answer

        const bgColor = checked ? colorMapping[index].color : 'default'

        return (
          <FlexContainer key={value} classlist={`${styles.container} ${styles[bgColor]}`}>
            <label
              className={`${styles.radio} ${styles[colorMapping[index].color]}`}
            >
              <div>
                <Typography variant='span'
                  classList={classNames(styles.checkmark, styles[colorMapping[index].color], checked && styles.checked)}
                >
                  {checked ? (<img src='/static/icons/check-icon.svg' className={styles.checkedImg}/>) : null}
                </Typography>
              </div>

              <Typography variant='p' classList={styles.text}>
                {text}{value === answer}
              </Typography>
              <FormInput
                type='radio'
                name='radio'
                value={value}
                checked={value === answer}
                onChange={handleSelect}
              />
            </label>
          </FlexContainer>
        )
      })}
  </div>
)
