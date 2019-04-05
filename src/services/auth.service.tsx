import * as React from 'react'
import { Redirect } from 'react-router-dom'
import client from '../client'
import { useCacheService } from './cache.service'

export const withAuth = (Component: React.ComponentType) => {
  return (props) => {
    if (!isSignedIn()) {
      if (props.history.location.pathname === '/sign-in') {
        return null
      }

      return (
        <Redirect to="/sign-in" />
      )
    }

    useCacheService()

    return (
      <Component {...props} />
    )
  }
}

export const signIn = (currentUserId) => {
  document.cookie = `currentUserId=${currentUserId}`

  // This will become async in the near future
  return Promise.resolve()
}

export const signOut = () => {
  // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
  // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
  document.cookie = `currentUserId=;expires=${new Date(0)}`

  // Clear cache
  return client.clearStore()
}

export const isSignedIn = () => {
  return /currentUserId=.+(;|$)/.test(document.cookie)
}
