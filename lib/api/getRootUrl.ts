export default function getRootUrl() {
  const port = process.env.PORT || 3001
  const dev = process.env.NODE_ENV !== 'production'
  const ROOT_URL = dev ? `http://localhost:${port}` : 'http://localhost:3000'

  return ROOT_URL
}
