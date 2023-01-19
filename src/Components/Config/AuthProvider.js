import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";
// import useInfiniteScroll from "./useInfiniteScroll";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth,setAuth] = useState(Cookies.get('authorization'));
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState([]);
  const [liked, setLiked] = useState([]);
  const [allUsers ,setAllUsers] = useState([]);
  const [loading , setLoading] = useState(true)
  // const [pageNo, setPageNo] = useState(4);
  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const apiURL = "http://localhost:5000"
  
  useEffect(() => {
    const Alldata = async () => {
      try {
       const PostData = await axios.get(`${apiURL}/posts`, {
         headers: {
           Authorization: `Bearer ${auth}`
         },
       })
       const UserData = await axios.get(`${apiURL}/user/viewUser`, {
         headers: {
           Authorization: `Bearer ${auth}`
         },
       })
       const Profiles = await axios.get(`${apiURL}/profile`, {
         headers: {
           Authorization: `Bearer ${auth}`
         },
       })
       const UserAll = await axios.get(`${apiURL}/user`, {
         headers: {
           Authorization: `Bearer ${auth}`,
           Accept: 'application/json'
         },
       })
       const Liked2 = await axios.get(`${apiURL}/posts/star`, {
         headers: {
           Authorization: `Bearer ${auth}`,
           Accept: 'application/json'
         },
       })
       setLiked(Liked2.data)
       setPosts(PostData.data);
       setUser(UserData.data)
       setProfiles(Profiles.data)
       setAllUsers(UserAll.data)
      } catch (error) {
       console.warn(error.message);
      }
       }
     Alldata()
      setLoading(false);
 
  }, [auth])

  // function fetchMoreListItems() {
  //   setTimeout(() => {
  //     setPageNo(pageNo + 4)
  //     setIsFetching(false);
  //   }, 2000);
  // }
  // setTimeout(() => {
  //   setIsFetching(false)
  // }, 5000);
  return (
    <AuthContext.Provider value={{posts,liked,allUsers,profiles,setLoading,setAuth,auth,setPosts,user,loading}} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
