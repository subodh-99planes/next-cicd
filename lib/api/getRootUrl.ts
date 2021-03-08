export default function getRootUrl() {
  const port = process.env.PORT || 3001
  const dev = process.env.NODE_ENV !== 'production'
  let ROOT_URL = ''
  try {
    ROOT_URL = `http://${window.location.host}`
  } catch (e) {
    ROOT_URL = dev ? `http://localhost:${port}` : process.env.BASE_URL || ''
  }
  return ROOT_URL
}
