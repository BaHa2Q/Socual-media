import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";
const AuthContextProfile = createContext({});

export const AuthProviderProfile = ({ children }) => {
  const auth = Cookies.get("authorization");
  const [liked, setLiked] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [myprofile, setMyprofile] = useState([]);
  const [friendprofile, setFriendprofile] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiURL = "http://localhost:5000";

  useEffect(() => {
    const Alldata = async () => {
      try {
        const Profile = await axios.get(`${apiURL}/profile`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        });
        const Friends = await axios.get(`${apiURL}/friends`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        });
        const myprofile = await axios.get(`${apiURL}/order/myprofile`, {
          headers: {
            Authorization: `Bearer ${auth}`,
            Accept: "application/json",
          },
        });
        const friendprofile = await axios.get(`${apiURL}/order/friendprofile`, {
          headers: {
            Authorization: `Bearer ${auth}`,
            Accept: "application/json",
          },
        });
        setFriends(Friends.data);
        setProfiles(Profile.data);
        setMyprofile(myprofile.data);
		setFriendprofile(friendprofile.data);
      } catch (error) {
        console.warn(error.message);
      }
    };
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    Alldata();
  }, [auth]);

  return (
    <AuthContextProfile.Provider
      value={{friends,auth, myprofile,friendprofile, loading, profiles, apiURL }}
    >
      {children}
    </AuthContextProfile.Provider>
  );
};

export default AuthContextProfile;
