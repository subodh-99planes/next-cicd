import * as express from 'express'
import httpStatus from 'http-status'
import { getJWT } from '../util/auth'
import { errors } from '../util/localeConfig/en'
import { ExpressRequest } from 'utils/types'

const authenticate = async (req: ExpressRequest, res: express.Response, next: express.NextFunction): Promise<any> => {
  const email = await getJWT(req.body.token)
  if (email) {
    req.body.email = email
    next()
  } else {
    res.status(httpStatus.UNAUTHORIZED).send({
      error: errors.user.invalid_token
    })
  }
}

export default authenticate
