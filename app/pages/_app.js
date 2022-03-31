import '../styles/globals.scss'
import {AppProvider} from "../context"

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
