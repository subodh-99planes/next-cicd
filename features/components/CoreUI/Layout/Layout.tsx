import Head from 'next/head'
import { FC } from 'react'
import { meta } from 'utils/localeConfig/en'
import styles from './Layout.module.scss'

export const Layout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Imagination Spectrum</title>
        <meta
          name='description'
          content={meta.description}
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='shortcut icon'
          href='/static/aphantasia-logo.png'
          sizes='any'
        />
      </Head>

      {children}
    </div>
  )
}
