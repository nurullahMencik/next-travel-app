"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react"

interface clientWrapperProps{
    children:React.ReactNode
}

const ClientWrapper = ({children}:clientWrapperProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default ClientWrapper
