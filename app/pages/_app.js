import '../styles/globals.scss'
import {AppProvider} from "../context"
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
