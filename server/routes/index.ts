import authRoute from './auth.route'
import user from './user.route'
import express from 'express'
import surveyRoute from './survey.route'
import authorize from '../middleware/authorize'

const router = express.Router()

router.get('/status', (_req, res) => {
  res.send('OK')
})

router.use('/', authorize)

router.use('/auth', (req, res, next) => {
  authRoute(req, res, next)
})

router.use('/user', (req, res, next) => {
  user(req, res, next)
})

router.use('/survey', (req, res, next) => {
  surveyRoute(req, res, next)
})


export default router
