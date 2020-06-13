import React, { useState } from 'react';

import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:''

  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, photoURL,email} = res.user;
      const signedIndUser ={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedIndUser);
      console.log(displayName, photoURL, email );
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message)
    })
  }
  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser ={
        isSignedOut:false,
        name:'',
        photo:'',
        email:''
      }
      setUser(signedOutUser);

    })
    .catch (err =>{

    })
  }
  return (
    <div className="App">
      {
        user.isSignedIn ?  <button style={{backgroundColor:'green', width:'150px',marginTop:'400px'}} onClick={handleSignOut}>Sign Out</button>:
        <button style={{backgroundColor:'green', width:'150px',marginTop:'400px'}} onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn &&<div>
         <p> Welcome :{user.name}</p>
         <p>Your Email:{user.email}</p>
         <img src={user.photo} alt=""/>
         </div>
      }
    </div>
    // This is for upload git 
    // for Checking git
  );
}

export default App;
