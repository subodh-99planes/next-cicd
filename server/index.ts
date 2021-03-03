// eslint-disable-next-line no-unused-vars
import express, { Request, Response } from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import multer from 'multer'
import routes from './routes'
import compress from 'compression'
import methodOverride from 'method-override'
import passportSetup from './config/passport'
import cookieSession from 'cookie-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import helmet from 'helmet'
import CORSConfig from './config/cors'
import config from './config/vars'
import initDB from './database'
import { errorHandler } from './middleware/errorhandler'
import { NextFunction } from 'express-serve-static-core'


const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = config.port;

(async () => {
  try {
    await nextApp.prepare()
    const app = express()

    passportSetup()
    // parse cookies
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(multer().none())
    app.use(bodyParser.json())

    // lets you use HTTP verbs such as PUT or DELETE
    // in places where the client doesn't support it
    app.use(methodOverride())

    // userdetails(social auth) cookie config
    app.use(
      cookieSession({
        httpOnly: true,
        name: config.cookieConfig.name,
        keys: config.cookieConfig.keys,
        maxAge: config.cookieConfig.maxAge
      })
    )

    app.use(passport.initialize())
    app.use(function(req, res, next) {
      if (req.url.match(/^\/_next\/.+/)) { next() } else { passport.session()(req, res, next) }
    })
    

    // gzip compression
    app.use(compress())

    // secure apps by setting various HTTP headers
    app.use(helmet())

    // enable CORS - Cross Origin Resource Sharing
    app.use(cors(CORSConfig))

    app.use('/', routes)

    app.all('*', (req: Request, res: Response, nextFn: NextFunction) => {
      return handle(req, res).catch(e => {
        // use rejected promise to forward error to next express middleware
        nextFn(e)
      })
    })

    app.use(errorHandler)

    await initDB()

    app.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
