import express from 'express'
import surveyController from '../controllers/survey.controller'
import makeCallback from '../express-callback'
import httpStatus from 'http-status'
import { sendRegistrationEmail } from '../controllers/user.controller'

const router = express.Router()

const emailCheck = (req, res, next) => {
  if (!req.body.email && !req?.user?.email) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Please provide a valid email'
    })
  }
  next()
}

router
  .route('/')
  .get(makeCallback(surveyController.getSurvey))
  .post(emailCheck, surveyController.submitSurvey, makeCallback(sendRegistrationEmail))

router
  .route('/:id')
  .get(makeCallback(surveyController.getSurveyById))

export default router
