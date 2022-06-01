import React from 'react';

import { signInUser } from '../data/auth/firebaseSignInout';

export default function SignIn() {

  return (
    <>
      <div className="text-center mt-5">
        <h1>Welcome to Caffe Cache</h1>
        <button type="button" className="btn btn-success" onClick={signInUser}>
          Sign In
        </button>
      </div>
    </>
  );
}