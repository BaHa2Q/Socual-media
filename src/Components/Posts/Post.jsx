import React, { Fragment, useContext, useState } from "react";
import styles from "./styles.module.css";
import {  AiTwotoneStar } from "react-icons/ai";

import Interactions from "./Interactions";
import axios from "axios";
import Setting from "./Setting";
import Cookies from "js-cookie";
import AuthContext from "../Config/AuthProvider";
import LazyPostLoad from "./skeleton/LazyPostLoad";
import MineProfile from "./Mini-Profile/indexs";
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

const Posts = () => {
  const [userAbout, setUserAbout] = useState("");
  const tokencookie = Cookies.get("authorization");
  const { posts, user, loading } = useContext(AuthContext);
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

    return (
    <>

      {posts.filter(date => date.DeleteAt === null)
        .sort(function (a, b) {
          return new Date(b.CreateAt) - new Date(a.CreateAt);
        })
        .map(({ text, CreateAt, image, userId, _id }, index) => (
          <div className={styles.container} key={index}>
            <p
              style={{
                margin: "10px",
                textAlign: "left",
                color: "gray",
                fontSize: "15px",
              }}
            >
              <span>
                <AiTwotoneStar color="gold" /> Favorites
              </span>
      
              <span style={{ float: "right", margin: 0, color: "lightgray" }}>
                {DateTime.fromISO(CreateAt).toRelative()}
              </span>
            </p>
            <hr style={{     border: "1px solid rgb(70 70 70 / 25%)",width: "99%"}} />
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
      {posts.length === 0 && <h1 style={{ color: "white" }}>No data</h1>}
    </>
  );
};

export default Posts;
