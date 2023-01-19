// import axios from "axios";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
// import { createContext, useState, useEffect } from "react";
// // import useInfiniteScroll from "./useInfiniteScroll";
// const AuthContextAccount = createContext({});

// export const AuthProviderAccount = ({ children }) => {
//   const auth = (Cookies.get('authorization'));
//   const [profiles, setProfiles] = useState([]);
//   const apiURL = "http://localhost:5000"
//   useEffect(() => {
//     const Alldata = async () => {
//       try {
     
//        const Profile = await axios.get(`${apiURL}/profile/account`, {
//          headers: {
//            Authorization: `Bearer ${auth}`
//          },
//        })

//        setProfiles(Profile.data)
     

//       } catch (error) {
//        console.warn(error.message);
//       }
//        }
//     Alldata()
//   }, [auth])
//   return (
//     <AuthProviderAccount.Provider value={{profiles}} >
//       {children}
//     </AuthProviderAccount.Provider>
//   );
// };

// export default AuthContextAccount;
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
const AuthContextAccount = createContext({});

export const AuthProviderAccount = ({ children }) => {
  const auth = (Cookies.get('authorization'));
  const [profiles, setProfiles] = useState([]);
  const apiURL = "http://localhost:5000"
  useEffect(() => {
    const Alldata = async () => {
      try {
     
       const Profile = await axios.get(`${apiURL}/profile/account`, {
         headers: {
           Authorization: `Bearer ${auth}`
         },
       })

       setProfiles(Profile.data)
     

      } catch (error) {
       console.warn(error.message);
      }
       }
    Alldata()
  }, [auth])
  return (
    <AuthContextAccount.Provider value={{profiles}} >
      {children}
    </AuthContextAccount.Provider>
  );
};

export default AuthContextAccount;
