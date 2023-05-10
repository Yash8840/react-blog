import React, { useContext } from 'react'
import Login from './pages/Login';
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import './App.css'
import AuthContext from './Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';


const App = () => {
  const handleSignOut = ()=>{
    signOut(auth)
  }
  const authCtx = useContext(AuthContext);
  console.log(authCtx.currentUser);
  const ProtectedRoute = ({children})=>{
    if(!authCtx.currentUser){
      console.log('mew');
      return <Navigate to='/login'/> // changes the current location when it is rendered
    }
    console.log('cdax');
    return children;
  }
  
  return (
    <BrowserRouter>
    <nav>
      <h2>React Blog</h2>
      <Link to="/">Home</Link>
      {authCtx.currentUser && <Link to="/createPost">Create Post</Link>}
      {authCtx.currentUser && <button onClick={handleSignOut}>Log out</button>}
    </nav>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='createPost' element={<CreatePost/>}/>
      <Route path='login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App