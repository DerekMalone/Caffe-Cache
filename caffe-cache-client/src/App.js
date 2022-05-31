import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import { CaffeNavbar } from './components';
import auth from './data/auth/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='App'>
      <CaffeNavbar user={user} />
      <div className='main-container'>
        <Routes user={user} />
      </div>
    </div>
  );
}

export default App;
