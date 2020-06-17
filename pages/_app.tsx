import 'react-calendar/dist/Calendar.css'
import { AppProps } from 'next/app'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}