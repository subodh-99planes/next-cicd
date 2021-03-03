import httpStatus from 'http-status'
import { addUserToMailinglist, getUser, sendEmail, updatePassword } from '../use-cases'
import { email, errors, generics } from '../util/localeConfig/en'
import { generateJWT } from '../util/auth'
import config from '../config/vars'
import { ExpressRequest } from 'utils/types'
import withTryCatch from '../util/withTryCatch'

const logout = async (req: ExpressRequest, res) => {
  try {
    req.logout?.()
    req.session = null
    res.clearCookie(config.cookieConfig.name)
    return res.status(httpStatus.OK).send({ success: true })
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e?.message || errors.generic.unknown_error })
  }
}

const getUserFromSession = async (req: ExpressRequest) => {
  return req.user?.email ? {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: httpStatus.OK,
    body: {
      user: { email: req.user?.email }
    },
  } : {
    statusCode: httpStatus.UNAUTHORIZED
  }
}

const sendRegistrationEmail = async (req: ExpressRequest) => {
  const emailId = req.body.email || req.user?.email

  const existingUser = await getUser(emailId, { passwordGenerated: 1 })
  if (existingUser!.passwordGenerated || existingUser!.googleId || existingUser!.facebookId) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(Date.now()).toUTCString()
      },
      body: {
        message: generics.success_messages.accepted,
      },
      statusCode: httpStatus.OK
    }
  }

  const token = await generateJWT(emailId)

  const emailResult = await withTryCatch(sendEmail, {
    to: emailId,
    from: config.emailConfig.email,
    subject: email.subject,
    html: email.getHTML(config.host, token),
    text: email.getText(config.host, token),
  })
  return !emailResult || emailResult.error ? {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    body: {
      error: errors.email.failed
    }
  } : {
    headers: {
      'Content-Type': 'application/json',
      'Last-Modified': new Date(Date.now()).toUTCString()
    },
    body: {
      message: generics.success_messages.email_sent
    },
    statusCode: httpStatus.OK
  }
}

const subscribeUser = async (req: ExpressRequest, _res, next) => {
  const subscriptionResult = await withTryCatch(addUserToMailinglist, req.user?.email)
  if (subscriptionResult?.error) {
    // log errors
    console.log(subscriptionResult.error)
  }
  return next()
}

const redirectToHome = (req: ExpressRequest, res) => res.cookie('useremail', req!.user!.email, { maxAge: 60 * 100, httpOnly: true }).redirect(302, '/home')

const updateUserPassword = async (req: ExpressRequest, res, next) => {
  const userInfo = { ...req.body, ...req.user ? { email: req.user?.email } : {} }
  const existingUser = await withTryCatch(getUser, userInfo.email)
  if (!existingUser || existingUser.error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: existingUser.error })
  }
  if (existingUser?.passwordGenerated) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: errors.user.password_present })
  }
  const updated = await withTryCatch(updatePassword, { email: userInfo.email, password: userInfo.password })
  return !updated || updated.error ? res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: updated.error }) : next()
}

export const userController = Object.freeze({
  sendRegistrationEmail,
  subscribeUser,
  redirectToHome,
  updateUserPassword,
  getUserFromSession,
  logout,
})

export default userController

export { getUserFromSession, sendRegistrationEmail, subscribeUser, redirectToHome, updateUserPassword, logout }
