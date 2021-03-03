import surveyDb from './surveyDb'
import compoundSurveyDb from './compoundSurveyDb'
import dbService from '../config/db'
import makeUserDb from './userDb'

const { getDb } = dbService

const isDb = Object.freeze({
  surveyDb: surveyDb({ getDb }),
  compoundSurveyDb: compoundSurveyDb({ getDb }),
  userDb: makeUserDb({ getDb })
})

export default isDb
