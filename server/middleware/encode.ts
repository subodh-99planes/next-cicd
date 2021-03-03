import bcrypt from 'bcrypt'
import httpStatus from 'http-status'

const encode = (req, res, next) => {
  const { password } = req.body || req.user
  if (!password) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'Please provide a valid password'
    })
  }
  req.body.password = bcrypt.hashSync(password, 10)
  next()
}

export default encode
