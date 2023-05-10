import React, { useContext } from 'react';
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const handleSignIn = async() => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(result);
    console.log(user);
    authCtx.setNewUser(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  };
  
  if(authCtx.currentUser){
    console.log('hello');
    navigate('/')
  }
  
  return (
    <div >
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center', height: '100vh', paddingTop: '10%' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>React-Blog</h1>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Please sign in with your Google account to continue.
      </p>
      <button
        onClick={handleSignIn}
        style={{
          fontSize: '16px',
          padding: '10px 20px',
          border: 'none',
          backgroundColor: '#fff',
          color: '#333',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
      >
        Sign in with Google
      </button>
    </div>
    </div>
  );
}

export default Login;