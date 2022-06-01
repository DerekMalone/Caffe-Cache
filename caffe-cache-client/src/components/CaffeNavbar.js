import React from 'react'
import { signOutUser } from '../data/auth/firebaseSignInout'

export const CaffeNavbar = () => {
  return (
    <>
    <div>Navbar</div>
    <button type='button' onClick={signOutUser}>Sign Out</button>
    </>
  )
}
