
import express from 'express'
import passport from 'passport'
import passportAuth from '../middleware/passportAuth'
import { logout, redirectToHome, subscribeUser } from '../controllers/user.controller'
import config from '../config/vars'
import { errors } from '../util/localeConfig/en'

const router = express.Router()

router.post('/login', passportAuth, redirectToHome)

router.get('/logout', logout)

router.post('/success', subscribeUser, redirectToHome)

router.get('/google', passport.authenticate('google', {
  scope: config.authConfig.google.scopes
}))

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/',
  failureMessage: errors.user.auth_failed
}))

router.get('/google/success', subscribeUser, redirectToHome)

router.get('/facebook', passport.authenticate('facebook', {
  scope: config.authConfig.facebook.scopes
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/auth/facebook/success',
  failureRedirect: '/',
  failureMessage: errors.user.auth_failed
}))

router.get('/facebook/success', subscribeUser, redirectToHome)

export default router
