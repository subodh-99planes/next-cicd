import config from './vars'

const CORSConfig = {
  origin: [config.host],
  methods: 'GET,HEAD,PUT,PATCH,POST',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 600
}

export default CORSConfig
