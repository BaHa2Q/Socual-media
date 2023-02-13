import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { useEffect } from "react";
import AuthContextProfile from "../../../Config/AuthProviderProfile";
import styles from "./styles.module.css";

const Liked = () => {
  const { auth,apiURL } = useContext(AuthContextProfile);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
	axios.get(`${apiURL}/posts/star`, {
		headers: {
		  Authorization: `Bearer ${auth}`,
		},
	  }).then(res => setLiked(res.data));
  }, [])
  
  return (
    <Fragment>
      <div className={styles.container}>
        {liked.filter(date => date.DeleteAt === null).map((data, index) => (
          <div className={styles.item} key={index}>
            <div
              className={styles.header}
              style={
                data.image !== undefined ? { width: "100%" } : { width: "0%" }
              }
            >
              <p style={{ textAlign: "center", margin: 0, padding: "39px" }}>
                {data.text}
              </p>
            </div>
            {data.image !== undefined && (
              <div className={styles.image}>
                <img src={data.image} alt=""/>
                {data.postId}
              </div>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Liked;
