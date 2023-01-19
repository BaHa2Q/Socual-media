import React from "react";
import styles from "./styles.module.css";
const LazyPostLoad = () => {
  return (
    <div>
     {[1,2,3].map((data,index) =>  <div className={styles.container} key={index}>
      <div className={styles.header}>
        <div className={styles.details}>
          <span
            className={styles.skeletonBox}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          ></span>
          <div className={styles.label}>
            <span
              className={styles.skeletonBox}
              style={{ width: "100%", height: "100%", marginLeft: "10px" }}
            ></span>
          </div>
        </div>
      </div>
      <div className={styles.contant}>
        <div className={styles.description}>
          <span
            className={styles.skeletonBox}
            style={{ width: "80%", margin: "0.5ch" }}
          ></span>
          <span
            className={styles.skeletonBox}
            style={{ width: "90%", margin: "0.5ch" }}
          ></span>
          <span
            className={styles.skeletonBox}
            style={{ width: "83%", margin: "0.5ch" }}
          ></span>
        </div>
        <div className={styles.photo}>
          <span
            className={styles.skeletonBox}
            style={{ width: "100%", height: "190px" }}
          ></span>
        </div>
      </div>
      <div className={styles.measures}>
      </div>
    </div>)}
    </div>
  );
};

export default LazyPostLoad;
