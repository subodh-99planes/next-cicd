import passport from 'passport'
import httpStatus from 'http-status'
import { addUserToMailinglist } from '../use-cases'

const passportAuth = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(httpStatus.UNAUTHORIZED)
    }
    if (user) {
      addUserToMailinglist(user.email)
      req.logIn(user, err => {
        if (err) { return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message || 'An unkown error occurred.' }) }
        next()
      })
    } else {
      return res.status(httpStatus.UNAUTHORIZED)
    }
  })(req, res, next)
}

export default passportAuth
