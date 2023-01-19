import React, { Fragment, useContext } from "react";
import AuthContextProfile from "../../../Config/AuthProviderProfile";
import styles from "./styles.module.css";

const Liked = () => {
  const { liked } = useContext(AuthContextProfile);
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
