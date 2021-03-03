import jwt from 'jsonwebtoken'
import config from '../config/vars'

const generateJWT = async (email: string) => {
  return await jwt.sign({ id: email }, config.jwt.secret, { expiresIn: config.jwt.validity })
}

const getJWT = async (token: string) => {
  const { id: email } =  await jwt.verify(token, config.jwt.secret)
  return email
}

export { getJWT, generateJWT }
