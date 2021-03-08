import path from 'path'
import dotenv from 'dotenv-safe'

if (process.env.NODE_ENV !== 'production') {
// import .env variables
  dotenv.config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
  })
}

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3002,
  host: process.env.HOST || `http://localhost:${process.env.PORT || 3002}`,
  dbConfig: {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS
  },
  authConfig: {
    google: {
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.gender.read',
        'https://www.googleapis.com/auth/profile.agerange.read',
      ],
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: `${process.env.BASE_URL}/auth/google/callback` || '',
    },
    facebook: {
      clientId: process.env.FACEBOOK_APP_ID || '',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '',
      callbackURL: `${process.env.BASE_URL}/auth/facebook/callback` || '',
      scopes: ['email', 'user_age_range', 'user_gender', 'user_photos']
    }
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  cookieConfig: {
    name: process.env.USERDATA_COOKIE_NAME,
    keys: ['is_session_key'],
    maxAge: 24 * 60 * 60 * 100
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'sample_jwt',
    validity: process.env.JWT_TIME || 86400
  },
  emailConfig: {
    email: process.env.EMAIL_ADDR || '',
    subscriptionList: [process.env.MAIL_SUBSCRIPTION_LIST_ID] || [],
    auth: {
      user: process.env.MAIL_USER,
      key: process.env.MAIL_USERKEY,
      api_key: process.env.MAIL_API_KEY
    }
  }
}
