import passport from 'passport'
import PassportLocal from 'passport-local'
import passportGoogleAuth from 'passport-google-oauth2'
import passportFacebook from 'passport-facebook'
import db from '../data-access'
import config from '../config/vars'
import { authenticateUser } from '../use-cases'
import { errors } from '../util/localeConfig/en'
import util from 'util'
import request from 'request'



const GoogleStrategy = passportGoogleAuth.Strategy
const FacebookStrategy = passportFacebook.Strategy

const passportSetup = () => {
  // serialize the user.id to save in the cookie session
  // so the browser will remember the user when login

  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser(async (email, done) => {
    try {
      const user = await db.userDb.getUser(email)
      done(null, user)
    } catch (e) {
      done(new Error(errors.passport.deserialization_error))
    }
  })

  passport.use('local', new PassportLocal(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (_req, email, password, done) => {
      try {
        const authenticated = await authenticateUser(email, password)
        return authenticated ? done(null, authenticated) : done(new Error(errors.user.auth_failed))
      } catch (e) {
        console.log('exception', e)
        return done(new Error(errors.generic.unknown_error))
      }
    }
  ))

  passport.use(new GoogleStrategy({
    clientID: config.authConfig.google.clientId,
    clientSecret: config.authConfig.google.clientSecret,
    callbackURL: config.authConfig.google.callbackURL,
    passReqToCallback: true
  }, async (_x, accessToken, _refreshToken, profile, done) => {
    const promisified = util.promisify(request.get)
    const options = {
      method: 'GET',
      url: `https://people.googleapis.com/v1/people/${profile.id}?personFields=genders,ageRanges`,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      json: true
    }

    const result = await promisified(options)

    const [gender] = result?.body?.genders || []
    const [ageRange] = result?.body?.ageRanges || []

    const { email, displayName: name, id: googleId, picture: avatar } = profile
    const user = await db.userDb.createOrUpdateUser({ email, name, googleId, avatar, ageRange: ageRange?.ageRange, gender: gender?.value })
    return done(null, user)
  }))

  passport.use(new FacebookStrategy({
    clientID: config.authConfig.facebook.clientId,
    clientSecret: config.authConfig.facebook.clientSecret,
    callbackURL: config.authConfig.facebook.callbackURL,
    profileFields: ['id', 'emails', 'name', 'age_range', 'gender', 'picture.type(large)'],
  }, async (_x, _accessToken, _refreshToken, profile, done) => {
    const { id: facebookId, email, first_name: firstName, last_name: lastName, age_range: ageRange, gender } = profile?._json
    const avatar = profile.photos[0]?.value
    const user = await db.userDb.createOrUpdateUser({ email, name: `${firstName} ${lastName}`, facebookId, ageRange, gender, avatar })

    return done(null, user)
  }))
}

export default passportSetup
