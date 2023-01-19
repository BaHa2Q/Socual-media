import Post from "../Components/Posts/Post";
import styles from "./styles.module.css";
import CreatePost from "../Components/Posts/Create/indexs";
import { Fragment, useEffect, useRef, useState } from "react";
import Menu from "../Components/hook/Menu/Menu";
const Home = ({ posts }) => {

  return (
    <Fragment>
      <div className={styles.gridContainer}>
        <div className={` ${styles.Test}`}> 
        </div>

        <div className={` ${styles.Post}`}>
          <CreatePost />
          <Post posts={posts} />
        </div>
        <div className={`${styles.Test2}`} ></div>
      </div>
    </Fragment>
  );
};

export default Home;
