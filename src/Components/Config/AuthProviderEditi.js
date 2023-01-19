import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
const AuthContext1 = createContext({});

export const AuthProviderProfile = ({ children }) => {
  const auth = (Cookies.get('authorization'));
  const [profiles, setProfiles] = useState([]);
  const [trash, setTrash] = useState([]);
  const [loading , setLoading] = useState(true)
  const apiURL = "http://localhost:5000"


  useEffect(() => {
    const Alldata = async () => {
      try {
     
       const Trash = await axios.get(`${apiURL}/posts/trash`, {
         headers: {
           Authorization: `Bearer ${auth}`
         },
       })
       const Profile = await axios.get(`${apiURL}/profile`, {
         headers: {
           Authorization: `Bearer ${auth}`
         },
       })
     
       const Liked = await axios.get(`${apiURL}/posts/star`, {
         headers: {
           Authorization: `Bearer ${auth}`,
           Accept: 'application/json'
         },
       })
       setTrash(Trash.data)
       setLiked(Liked.data)
       setProfiles(Profile.data)
      } catch (error) {
       console.warn(error.message);
      }
       }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    Alldata()
  }, [auth])
  return (
    <AuthContext1.Provider value={{loading,profiles,liked,apiURL,trash}} >
      {children}
    </AuthContext1.Provider>
  );
};

export default AuthContext1;
