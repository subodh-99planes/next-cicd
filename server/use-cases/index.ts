import db from '../data-access'
import { makeAddUserToMailinglist, makeAuthenticateUser, makeGetUser, makeSendEmail, makeSubmitUserSurvey, makeUpdatePassword } from './user'
import { makeGetSurvey, makeGetSurveyById } from './getSurvey'

const { surveyDb, userDb, compoundSurveyDb } = db

const getSurvey = makeGetSurvey({ surveyDb })
const getSurveyById = makeGetSurveyById({ surveyDb, compoundSurveyDb })
const submitSurvey = makeSubmitUserSurvey({ surveyDb, userDb, compoundSurveyDb })
const sendEmail = makeSendEmail()
const updatePassword = makeUpdatePassword({ userDb })
const authenticateUser = makeAuthenticateUser({ userDb })
const getUser = makeGetUser({ userDb })
const addUserToMailinglist = makeAddUserToMailinglist({ userDb })

const isService = Object.freeze({
  authenticateUser,
  getUser,
  getSurvey,
  getSurveyById,
  sendEmail,
  submitSurvey,
  updatePassword,
  addUserToMailinglist,
})

export default isService
export { authenticateUser, getUser, getSurvey, getSurveyById, submitSurvey, sendEmail, updatePassword, addUserToMailinglist }
