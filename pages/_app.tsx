import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'survey-react/survey.css'
import '../features/main.scss'
import '../features/components/CoreUI/Button/Button.module.scss'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default App
