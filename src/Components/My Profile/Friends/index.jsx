import React, { Fragment, useContext, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import AuthContextProfile from "../../Config/AuthProviderProfile";
import styles from "./styles.module.css";
const Friends = ({ profile }) => {
  const { friends, profiles } = useContext(AuthContextProfile);
  const profileId = profile[0]

 
  console.log(friends);
  const [filterUser, setFilterUser] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={styles.searchInput}
          type="search"
          name=""
          placeholder="Search"
          onChange={(e) => setFilterUser(e.target.value)}
        />
      </div>
      {/* <div className={styles.gridContainer}>
        {friends
          .filter((data) => data.userId === profile?.userId)
          .map(({ friendId }, index) => (
            <>
              {search
                .filter((data) => data.userId === friendId)
                .map((data, index) => (
                  <div className={styles.gallery} key={index}>
                    <Link
                      target="_blank"
                      to={`/${data.username.replace(/ /gi, ".")}`}
                    >
                      <img
                        src={data.image}
                        alt="Mountains"
                        width="150"
                        height="150"
                      />
                    </Link>
                    <div className={styles.desc}>
                      <Link to={`/${data.username.replace(/ /gi, ".")}`}>
                        {data.name.replace(/\b[a-z]|_(?=\w)/g, (char) =>
                          char.toUpperCase()
                        )}
                      </Link>
                    </div>
                  </div>
                ))}
            </>
          ))}
      </div> */}
      <div className={styles.gridContainer}>
        {friends
         .filter((data) => data.friendprofileId === profileId?._id)
          .map(({ profileId }, index) => (
            <Fragment key={index}>
              {profiles
                .filter((data) => data._id === profileId)
                .filter((val) => {
                  if (filterUser === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(filterUser.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((data, index) => (
                  <div className={styles.gallery} key={index}>
                    <Link
                      target="_blank"
                      to={`/${data.username.replace(/ /gi, ".")}`}
                    >
                      <img
                        src={data.image}
                        alt="Mountains"
                        width="150"
                        height="150"
                      />
                    </Link>
                    <div className={styles.desc}>
                      <Link to={`/${data.username.replace(/ /gi, ".")}`}>
                        {data.name.replace(/\b[a-z]|_(?=\w)/g, (char) =>
                          char.toUpperCase()
                        )}
                      </Link>
                    </div>
                  </div>
                ))}
				
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Friends;
