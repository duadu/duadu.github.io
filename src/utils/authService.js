import cookie from 'react-cookie'
// import { CookieDomain } from '../config.js'

let cookieConfig = {}

export function signOut () {
  cookie.remove('token', cookieConfig)
}

export function getCookie(name) {
  return cookie.load(name)
}