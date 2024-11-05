import { createContext , useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AuthContext= createContext([{
  auth: [],

  setAuth: ()=>{},
  handleLogout:()=>{},

}])

export const AuthProvider=({children})=>{
    const [auth, setAuth]= useState(null);
    const [lastPage, setLastPage]= useState(null)
    const cookies = new Cookies(); 
    
    //To get the token from the cookies, if the user is logged in and his token has not expired yet
    useEffect(() => {
        // Check for token in cookies on app load
        const token = cookies.get("jwt_authorization");
    
        if (token) {
          // Decode and set auth if token is valid
          try {
            const decoded = jwtDecode(token);
            setAuth(decoded);
          } catch (error) {
            console.error("Failed to decode token:", error);
            setAuth(null);
          }
        }
      }, []); // Run only once on app load

    const handleLogout=()=>{
      setAuth(null);
      cookies.remove("jwt_authorization")
      toast.success("Logged out")
    }

    return <AuthContext.Provider value={{auth, setAuth, handleLogout, lastPage, setLastPage}}>{children}</AuthContext.Provider>
}