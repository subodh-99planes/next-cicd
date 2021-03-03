
import express from 'express'
import authenticate from '../middleware/authenticate'
import encode from '../middleware/encode'
import { getUserFromSession, updateUserPassword } from '../controllers/user.controller'
import passportAuth from '../middleware/passportAuth'
import makeExpressCallback from '../express-callback'

const router = express.Router()

router.get('/me', makeExpressCallback(getUserFromSession))

router.post('/password', authenticate, encode, updateUserPassword, passportAuth)

export default router
