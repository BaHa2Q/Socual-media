import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
const AuthContextProfile = createContext({});

export const AuthProviderProfile = ({ children }) => {
  const auth = (Cookies.get('authorization'));
  const [liked, setLiked] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState([]);
  const [waitting, setWaitting] = useState([]);
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
       const Friends = await axios.get(`${apiURL}/friends`, {
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
       const friend = await axios.get(`${apiURL}/friends/friend`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          Accept: 'application/json'
        },
        
      })
      const wait = await axios.get(`${apiURL}/friends/wait`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          Accept: 'application/json'
        },
        
      })
       setTrash(Trash.data)
       setLiked(Liked.data)
       setFriends(Friends.data)
       setProfiles(Profile.data)
       setFriend(friend.data)
       setWaitting(wait.data)

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
    <AuthContextProfile.Provider value={{waitting,friend,friends,loading,profiles,liked,apiURL,trash}} >
      {children}
    </AuthContextProfile.Provider>
  );
};

export default AuthContextProfile;
