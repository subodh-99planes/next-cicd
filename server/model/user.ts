import { GenericObject } from 'utils/utilTypes'
import bcrypt from 'bcryptjs'

interface UserDetails {
  surveyId: string;
  emailId: string;
  answers: [GenericObject];
  email: string,
  name?: string,
  createdOn: number,
  lastUpdated: number,
  facebookId?: string,
  googleId?: string,
  source: GenericObject,
  password?: string,
}

const makeUser = ({
  email,
  name,
  createdOn = Date.now(),
  facebookId,
  googleId,
  source,
  lastUpdated = Date.now(),
  password,
}: UserDetails): GenericObject  => {
  return Object.freeze({
    getEmail: () => email,
    getName: () => name,
    getCreateDate: () => createdOn,
    getFacebookId: () => facebookId,
    getGoogleId: () => googleId,
    getPassword: () => bcrypt.hashSync(password, 10),
    getLastUpdated: () => lastUpdated,
    getSource: () => source
  })
}

export default makeUser
