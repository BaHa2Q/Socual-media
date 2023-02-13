import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { Fragment, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../Components/Config/AuthProvider";
import AuthContextProfile, {
  AuthProviderProfile,
} from "../../Components/Config/AuthProviderProfile";
import Follower from "../../Components/My Profile/Follower";
import Friends from "../../Components/My Profile/Friends";
import ContextHeader from "../../Components/My Profile/Header";
// import { useParams } from "react-router-dom";
// import AuthContext from "../../Components/Config/AuthProvider";
import MyPosts from "../../Components/My Profile/MyTabs";
import Tabs from "../../Components/My Profile/Tabs";
import styles from "./styles.module.css";
const Profile = () => {
  const { username } = useParams();
  const { profiles } = useContext(AuthContextProfile);
  const tokencookie = Cookies.get("authorization");
  const account = jwtDecode(tokencookie)
  const Username = username.toLowerCase() === username.toString()
  const profile = profiles.filter(
    (data) => data.username.replace(/ /gi, ".") === username.toString()
  );
  const components = [
    { id: 0, namePage: "Home", page: <MyPosts profile={profile} />},
    { id: 1, namePage: "Friend", page: <Friends profile={profile} />},
  ];
  const [Toggle, setToggleChecked] = useState(0);
  return (
    <Fragment>
      <AuthProviderProfile>
        {profile.map(({ background, name, image, _id,userId }, index) => (
          <Fragment  key={index}>
            <div className={styles.gridContainer}>
              <div className={styles.header}>
                <ContextHeader profile={{ background, name, image }} />
              </div>
              <div className={`${styles.gridItem} ${styles.Post}`}>
                <div className={styles.class}>
                  {account.user.id !== userId &&<Follower profileId={_id} userId={userId} />}
                </div>
              </div>
              <div className={`${styles.gridItem} ${styles.Post}`}>
                <div className={` ${styles.contant} ${styles.gridItem}`}>
                  <div className={styles.tabs}>
                    <Tabs
                      setToggleChecked={setToggleChecked}
                      components={components}
                      Toggle={Toggle}
                    />
                  </div>

                  {components
                    .filter((item) => item.id === Toggle)
                    .map(({ page }, index) => (
                      <div className={styles.contant} key={index}>
                        <div className={styles.myposts}>{page}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={`${styles.gridTtem} ${styles.Test2}`}></div>
            </div>

            <div className={styles.footer}></div>
          </Fragment>
        ))}
      </AuthProviderProfile>
    </Fragment>
  );
};

export default Profile;
