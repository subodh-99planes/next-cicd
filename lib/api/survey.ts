import sendRequest from './sendRequest'
import { UserSurveyData } from '../../utils/types'
import { GenericObject } from '../../utils/utilTypes'
const BASE_PATH = '/survey'

export const getSurvey = async (surveyId?: string): Promise<GenericObject | null> => {
  return await sendRequest(`${BASE_PATH}/${surveyId || ''}`, {
    method: 'GET',
  })
}

export const submitSurvey = async (
  surveyData: UserSurveyData
): Promise<{ error?: string; message?: string }> => {
  const { message, error } = await sendRequest<any>(BASE_PATH, {
    method: 'POST',
    data: JSON.stringify(surveyData),
  })
  return error ? { error } : { message }
}
