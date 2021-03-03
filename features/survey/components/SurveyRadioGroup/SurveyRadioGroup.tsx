import React, { FC } from 'react'

import { Typography } from 'features/components/CoreUI'
import FlexContainer from 'features/components/CoreUI/FlexContainer/FlexContainer'
import { SurveyElement } from 'utils/types'

import { SurveyAnswers } from '..'

interface Props {
  data: SurveyElement
  page: number
  answer: string
  handleSelect: React.ChangeEventHandler<HTMLInputElement>
}

export const SurveyRadioGroup: FC<Props> = ({ data, page, handleSelect, answer }) => (
  <FlexContainer direction='col' align='start' fill>
    <Typography variant='h2'>{data.title}</Typography>
    <SurveyAnswers
      handleSelect={handleSelect}
      answer={answer}
      index={page + 1}
      choices={data.choices}
    />
  </FlexContainer>
)
