import { useContext, createContext, useState, useEffect } from "react";
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
  updateProfile,
} from "firebase/auth";
import AxiosPublic from "../hook/useAxiosPublic";


import axios from "axios";
const AuthProvider = ({ children }) => {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [cartTrigger, setCartTrigger] = useState(0);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signUpWhiteGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    login,
    logout,
    signUpWhiteGoogle,
    updateUserProfile,
    setCartTrigger,
    cartTrigger,
  };

  //check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = {email:currentUser.email}
        AxiosPublic.post("/jwt" , userInfo ).then((response)=>{
          if(response.data.toker){
            localStorage.setItem("access_token",response.data.token);
          }
        })
      }else{
        localStorage.removeItem("axxess_token")
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [AxiosPublic]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
