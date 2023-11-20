'use client'
import { SessionProvider } from "next-auth/react" 
interface AppProps {
  Component: React.ComponentType;
  pageProps: {
    session: any; 
  };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

