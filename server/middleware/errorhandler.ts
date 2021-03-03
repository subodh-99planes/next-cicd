import { Request, Response } from 'express'
import { errors } from '../util/localeConfig/en'
import httpStatus from 'http-status'

interface HttpException extends Error {
  statusCode: number;
  message: string;
  error: string | null;
}

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response
) => {
  const status = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
  const message =
    error.message || errors.generic.generic_error

  response.status(status).send(message)
}
