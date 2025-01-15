import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Children, createContext, useState } from "react";
import auth from "../Firebas/Firebas.init";


export const AuthContext = createContext(null)



const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // const logInUser = (email, password) => {
  //   setLoading(true)
  //   return signInWithEmailAndPassword(auth, email, password)
  // };

  const logInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }



  
  const studyInfo = {
    createUser,
    logInUser
  }
  return (
    <AuthContext.Provider value={studyInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;