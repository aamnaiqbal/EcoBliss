import { createContext , useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";


export const AuthContext= createContext()

export const AuthProvider=({children})=>{
    const [auth, setAuth]= useState(null)
    useEffect(() => {
        const cookies = new Cookies(); 
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

    if(auth){
        console.log(auth.id)
    }

    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
}