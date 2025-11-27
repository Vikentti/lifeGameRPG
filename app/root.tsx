import '@/styles'

import React, {useEffect, useState} from "react"
import {Provider} from "react-redux"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import {PersistGate} from 'redux-persist/integration/react'

import {
  CompletePopUpContext
} from "../src/hookes/CompletePopUpContext/CompletePopUpContext"
import Content from "../src/layouts/Content/Content"
import Header from "../src/layouts/Header/Header"
import {
  createClientStore,
  createServerStore,
} from "../src/states/store"
import type {Route} from "./+types/root"

const isClient = typeof window !== 'undefined'

// Создаем хранилища один раз
let clientStore: ReturnType<typeof createClientStore> | null = null

const getClientStore = () => {
  if (!clientStore && isClient) {
    clientStore = createClientStore()
  }
  return clientStore
}

export function Layout({children}: { children: React.ReactNode }) {
  const [activePopUp, setActivePopUp] = useState(false)
  const [popUpTitle, setPopUpTitle] = useState('')
  const [xpGained, setXpGained] = useState(0)
  const [characteristic, setCharacteristic] = useState('')
  const [isHydrated, setIsHydrated] = useState(!isClient)

  useEffect(() => {
    if (isClient) {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (activePopUp) {
      setTimeout(() => setActivePopUp(false), 5500)
    }
  }, [activePopUp])

  const store = isClient ? getClientStore()?.store : createServerStore()
  const persistor = isClient ? getClientStore()?.persistor : null

  // Пока не произошла гидрация, показываем только серверный контент
  if (!isHydrated) {
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <Provider store={createServerStore()}>
        <CompletePopUpContext value={{
          activePopUp, setActivePopUp,
          popUpTitle, setPopUpTitle,
          xpGained, setXpGained,
          characteristic, setCharacteristic
        }}>
          <Header />
          <Content>
            {children}
          </Content>
        </CompletePopUpContext>
      </Provider>
      <ScrollRestoration />
      <Scripts />
      </body>
      </html>
    )
  }

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
    <Provider store={store!}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <CompletePopUpContext value={{
            activePopUp, setActivePopUp,
            popUpTitle, setPopUpTitle,
            xpGained, setXpGained,
            characteristic, setCharacteristic
          }}>
            <Header />
            <Content>
              {children}
            </Content>
          </CompletePopUpContext>
        </PersistGate>
      ) : (
        <CompletePopUpContext value={{
          activePopUp, setActivePopUp,
          popUpTitle, setPopUpTitle,
          xpGained, setXpGained,
          characteristic, setCharacteristic
        }}>
          <Header />
          <Content>
            {children}
          </Content>
        </CompletePopUpContext>
      )}
    </Provider>
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}