import React, { Fragment, useContext, useState } from "react";
import styles from "./styles.module.css";
import {  AiTwotoneStar } from "react-icons/ai";

import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import Interactions from "../../../Posts/Interactions";
import MineProfile from "../../../Posts/Mini-Profile/indexs";
import Setting from "../../../Posts/Setting";
import LazyPostLoad from "../../../Posts/skeleton/LazyPostLoad";
import AuthContext from "../../../Config/AuthProvider";
import { DateTime } from "luxon";
export const TextPost = ({ text }) => {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <Fragment>
      <div
        style={{
          color: "#bcbcbc",
          textAlign: "left",
          margin: "20px 0px 20px 0px",
        }}
      >
        {seeMore ? (
          <p style={{ overflow: "hidden", wordBreak: "break-all" }}>{text}</p>
        ) : (
          <p style={{ overflow: "hidden", wordBreak: "break-all" }}>
            {text.substring(0, 100)}
          </p>
        )}

        <span>
          {seeMore ? null : (
            <p onClick={() => setSeeMore(true)} style={{ color: "white" }}>
              {text.length > 100 && "See more..."}
            </p>
          )}
        </span>
      </div>
    </Fragment>
  );
};

const MyPost = () => {
  const [userAbout, setUserAbout] = useState("");
  const tokencookie = Cookies.get("authorization");
  const {user, loading } = useContext(AuthContext);
  const { username } = useParams();
  const { profiles } = useContext(AuthContext);
  const { posts } = useContext(AuthContext);
  function handelClick(_id, users) {
    axios
      .post(
        `http://localhost:5000/posts/star/${_id}`,
        { users },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
      });
  }

  if (loading) {
    return <LazyPostLoad />;
  }

  const profile = profiles.filter(
    (data) => data.username.replace(/ /gi, ".") === username.toString()
  )[0];
    const postsNew =posts.filter(date => date.DeleteAt === null).filter(data => data.userId === profile?.userId)
  return (
    <Fragment>
      {/* <div className={styles.container}>
        {posts.filter(data => data.userId === profile?.userId).map((data, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.header} style={data.image !== undefined ? {width:"100%"}:{width:"0%"}}>
            <p style={{    textAlign: "center",margin: 0,"padding": "39px"}}>{data.text}</p>
            </div>
            {data.image !== undefined &&<div className={styles.image}>
             <img src={data.image} alt=""/>
              </div>}
            </div>
        ))}
        
      </div> */}
      {posts.filter(date => date.DeleteAt === null).filter(data => data.userId === profile?.userId)
        .sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        })
        .map(({ text, CreateAt, image, userId, _id }, index) => (
          <div className={styles.container} key={index}>
            <p
              style={{
                textAlign: "left",
                padding:"5px",
                color: "gray",
                fontSize: "15px",
              }}
            >
              <span>
                <AiTwotoneStar /> Favorites
              </span>
      
              <span style={{ float: "right", margin: 0, color: "lightgray" }}>
              {DateTime.fromISO(CreateAt).toRelative()}
              </span>
            </p>
            <hr style={{ border: "1px solid #464646", width: "90%" }} />
            <div className={styles.header}>
              <div className={styles.detils}>
                <MineProfile
                  setUserAbout={setUserAbout}
                  userId={userId}
                  user={user}
                />
              </div>
              <div onClick={() => setUserAbout(_id)}>
                <Setting userAbout={userAbout} userId={userId} />
              </div>
            </div>
            <div className={styles.contant}>
              <div className={styles.description}>
                <TextPost text={text} />
              </div>
              <div className={styles.photo}>
                <img width={"100%"} height={"auto"} src={image}  alt=""/>
              </div>
            </div>
            <div className={styles.measures} onClick={() => handelClick(_id)}>
              <Interactions user={user} posts={posts} _id={_id} />
            </div>
          </div>
        ))}
      {/* {posts.length >= 20 && isFetching && <LazyPostLoad />} */}
      {postsNew.length === 0 && <h1 style={{ color: "white" }}>No data</h1>}
    </Fragment>
  );
};

export default MyPost;
