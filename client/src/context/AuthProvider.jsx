import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  ///UpdateProfile,
} from "firebase/auth";
const AuthProvider = ({ children }) => {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = ({ name ,photoURL}) => {
    return UpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
 
  const signUpWithGoogle = () =>{
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const logout = () =>{
    return signOut(auth);
  }

  const authInfo = {
    user,
    setUser,
    createUser,
    updateUserProfile,
    login,
    logout,
    signUpWithGoogle
  };



//check if user is logged in
  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if(currentUser) {
    setUser(currentUser);
    }
    return() => {
      return unsubscribe()
    }
   })

  },[auth])
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
