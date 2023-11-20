import React from 'react'
import Login from './login'
import {SessionProvider} from 'next-auth/react'
const page = () => {
  return (
    <SessionProvider>
        <Login />
  </SessionProvider>
  )
}

export default page;