import bcrypt from 'bcryptjs'
import sgMail from '@sendgrid/mail'
import httpStatus from 'http-status'
import request from 'request'
import util from 'util'

import config from '../config/vars'
import { errors } from '../util/localeConfig/en'
import { GenericObject, Nullable } from '../../utils/utilTypes'
import { SurveyType } from '../util/enums'

interface UserDetails {
  surveyId: string;
  emailId: string;
  answers: [GenericObject];
}

interface UserResult {
  passwordGenerated: boolean | undefined;
  id: string;
  lastUpdated: number;
  password?: string;
  googleId?: string;
  facebookId?: string;
}


const makeAddUserToMailinglist = ({ userDb }) => {
  return async (email: string): Promise<Nullable<GenericObject>> => {
    const user = await userDb.getUser(email, { subscribed: 1 })
    if (!user) {
      return { error: errors.user.not_found }
    }
    if (user.subscribed) {
      return {}
    }

    const promisified = util.promisify(request.put)
    const options = {
      method: 'PUT',
      url: 'https://api.sendgrid.com/v3/marketing/contacts',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${config.emailConfig.auth.api_key}`
      },
      body: {
        list_ids: config.emailConfig.subscriptionList,
        contacts: [{
          email
        }]
      },
      json: true
    }

    const postResult = await promisified(options)
    if (postResult.statusCode === httpStatus.ACCEPTED) {
      const updated = await userDb.updateUser({ email, subscribed: true, lastUpdated: Date.now() })
      return updated
    }
    return postResult.body.errors || { error: errors.generic.unknown_error }
  }
}

const makeSendEmail = () => {
  sgMail.setApiKey(config.emailConfig.auth.key!)
  return async options => {
    try {
      const emailStatus = await sgMail.send(options)
      return emailStatus
    } catch (error) {
      return { error }
    }
  }
}

const makeSubmitUserSurvey = ({ surveyDb, userDb, compoundSurveyDb }) => {
  return async (userDetails: UserDetails, surveyId, surveyType: SurveyType): Promise<UserResult | null> => {
    const user = await userDb.createOrUpdateUser({ ...userDetails, lastUpdated: Date.now() })

    if (user) {
      if (surveyType === SurveyType.NORMAL) {
        await surveyDb.incrementTakes(surveyId)
        return user
      }
      await compoundSurveyDb.incrementTakes(surveyId)
      return user
    }
    return null
  }
}

const makeGetUser = ({ userDb }) => {
  return async (email: string, projections?: GenericObject): Promise<UserResult | null> => {
    const user = await userDb.getUser(email, projections)
    return user
  }
}

const makeAuthenticateUser = ({ userDb }) => {
  return async (email: string, userpassword: string): Promise<Nullable<UserResult>> => {
    const user = await userDb.getUser(email, { password: 1 })
    if (!user) return null
    const { password, ...userDetails } = user
    return password === userpassword || bcrypt.compareSync(userpassword, password) ? userDetails : null
  }
}

const makeUpdatePassword = ({ userDb }) => {
  return async ({ email, password }) => {
    const existing = await userDb.getUser(email)
    if (!existing) {
      return { error: errors.user.not_found }
    }

    const updated = await userDb.updateUser({ email, password, lastUpdated: Date.now(), passwordGenerated: true })
    return updated
  }
}

export { makeGetUser, makeSendEmail, makeSubmitUserSurvey, makeUpdatePassword, makeAuthenticateUser, makeAddUserToMailinglist }
