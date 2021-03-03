import httpStatus from 'http-status'
const publicRoutes = {
  '': 1,
  login: 1,
  _next: 1,
  survey: 1,
  profile: 1,
  auth: 1,
  user: 1,
  static: 1,
}

const authorize = (req, res, next) => {
  const route = req.url.split('/')[1].split('?')[0]
  return publicRoutes[route] ? next() : req.user ? next() : res.status(httpStatus.UNAUTHORIZED).redirect('/login')
}

export default authorize
