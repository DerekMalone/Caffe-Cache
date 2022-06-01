import React, { useState, useEffect } from 'react';
import { AppRoutes } from './routes/index';
import { CaffeNavbar } from './components';
import auth from './data/auth/firebaseConfig';
// import { useNavigate } from 'react-router-dom';
import SignIn from './views/SignIn';

function App() {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],          
        };
        setUser(userObj);
      } else if (user || user === null) {
        setUser(false);        
        // navigate('/');
      }
    });
  }, []);

  return (
    <>
    {user ? (
    <div className='App'>
      <CaffeNavbar user={user} />
      <div className='main-container'>
        <AppRoutes user={user} />
      </div>
    </div>
    ) : (
      <SignIn />
    )}
    </>
  );
}

export default App;
