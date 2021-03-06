export default function getRootUrl() {
  const port = process.env.PORT || 3001
  const dev = process.env.NODE_ENV !== 'production'
  const ROOT_URL = dev ? `http://localhost:${port}` : 'http://isappcicdtest-env.eba-jcwwf9m4.us-east-1.elasticbeanstalk.com'

  return ROOT_URL
}
