import * as express from 'express'
import { ExpressRequest } from 'utils/types'

const makeExpressCallback = (controller: (req?) => any) => {
  return async (req: ExpressRequest, res: express.Response): Promise<unknown> => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    try {
      const httpResponse = await controller(httpRequest)
      if (httpResponse.headers) {
        res.set(httpResponse.headers)
      }
      res.type('json')
      return res.status(httpResponse.statusCode).send(httpResponse.body)
    } catch (e) {
      return res.status(500).send({ error: e || 'An unkown error occurred.' })
    }
  }
}

export default makeExpressCallback
