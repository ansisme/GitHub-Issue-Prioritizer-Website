'use client'
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"  
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps, session }: AppProps & { session: any }){
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp