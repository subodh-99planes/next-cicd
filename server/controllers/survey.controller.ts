import httpStatus from 'http-status'
import { has, keys, omit } from 'lodash'
import useCases from './../use-cases'
import makeExpressCallback from '../express-callback'
import { errors } from '../util/localeConfig/en'
import { ExpressRequest } from 'utils/types'
import withTryCatch from '../util/withTryCatch'
import { SurveyType } from '../util/enums'

const extractSurveyId = (surveyKey: string) => surveyKey ? surveyKey.split('_')[0] : ''

const getSurvey = async () => {
  const survey = await withTryCatch(useCases.getSurvey)

  return survey.error
    ? {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errors.survey.not_found,
    }
    : {
      statusCode: httpStatus.OK,
      body: survey,
    }
}

const getSurveyById = async (req: ExpressRequest) => {
  const survey = await withTryCatch(useCases.getSurveyById, req.params.id)

  return survey.error
    ? {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errors.survey.not_found,
    }
    : {
      statusCode: httpStatus.OK,
      body: survey,
    }
}

const getResultBySurveyId = (userInfoResult = {}) => (
  keys(userInfoResult).reduce((acc, curr) => {
    if (acc && acc[userInfoResult[curr].surveyId]) {
      acc[userInfoResult[curr].surveyId] = {
        ...acc[userInfoResult[curr].surveyId],
        ...{ [extractSurveyId(curr)]: omit(userInfoResult[curr], 'surveyId') }
      }
    } else {
      acc[userInfoResult[curr].surveyId] = { ...{ [extractSurveyId(curr)]: omit(userInfoResult[curr], 'surveyId') } }
    }
    return acc
  }, {})
)

const submitSurvey = async (req: ExpressRequest, _res, next) => {
  try {
    const { source = {}, ...userInfo } = {
      ...req.body,
      ...(req.user ? { email: req.user.email } : {}),
    }
    source.ip = req.ip
    source.browser = req.headers['User-Agent']
    // eslint-disable-next-line dot-notation
    if (req.headers['Referer']) {
      // eslint-disable-next-line dot-notation
      source.referrer = req.headers['Referer']
    }
    const toUpdate = {
      ...userInfo,
      source,
      result: getResultBySurveyId(userInfo.result),
    }

    const surveyId    = extractSurveyId(toUpdate?.surveyId)
    const survey      = await withTryCatch(useCases.getSurveyById, surveyId)
    if (survey.error) {
      return makeExpressCallback(() => ({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: errors.survey.not_found,
      }))
    }
    const surveyType  = has(survey, 'baseSurveyId') ? SurveyType.COMPOUND : SurveyType.NORMAL
    const updatedUser = await useCases.submitSurvey(toUpdate, surveyId, surveyType)
    if (updatedUser) {
      next()
    } else {
      return makeExpressCallback(() => ({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        body: {
          error: errors.generic.unknown_error,
        },
      }))
    }
  } catch (e) {
    // TODO: Error logging
    console.log(e)
    return makeExpressCallback(() => ({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      body: {
        error: e.message,
      },
    }))
  }
}

const surveyController = Object.freeze({
  getSurvey,
  getSurveyById,
  submitSurvey,
})

export default surveyController
