import React, { Fragment, useContext, useState } from "react";
import styles from "./styles.module.css";
import {AiOutlineInsertRowRight } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";

import AuthContext from "../../Config/AuthProvider";
import LazyPostLoad from "../../Posts/skeleton/LazyPostLoad";

import Liked from "../item filter/Liked Posts";
import ViewPostInTrash from "../item filter/Delete Posts";
import MyPost from "../item filter/MyPost";
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

const MyTabs = ({profile}) => {

  const { loading } =useContext(AuthContext);
  const [Toggle, setToggleChecked] = useState(0);

  const components = [
    {
      id: 0,
      name: "All",
      icon: <AiOutlineInsertRowRight fontSize={25} />,
      page: <MyPost profile={profile} />,
    },
    {
      id: 1,
      name: "Star",
      icon: <TiStarFullOutline fontSize={25} />,
      page: <Liked />,
    },
    {
      id: 2,
      name: "Delete",
      icon: <MdDeleteForever fontSize={25} />,
      page: <ViewPostInTrash />,
    },
  ];
  if (loading) {
    return <LazyPostLoad />;
  }
  return (

      <>
        <div className={styles.posts}>
          {components
            .filter((item) => item.id === Toggle)
            .map(({ page }, index) => (
              <div className={styles.contant} key={index}>
                {page}
              </div>
            ))}
        </div>
        <div className={styles.filterposts}>
          {components.map((data, index) => (
            <div
              className={styles.setting}
              key={index}
              onClick={() => setToggleChecked(data.id)}
            >
              <div
                className={`${styles.item} ${
                  Toggle === index ? `${styles.active}` : ``
                }`}
              >
                <span style={{ margin: "10px" }}>{data.icon}</span>
                <div className={styles.label}>
                  <p style={{ fontSize: "19px" }}>{data.name}</p>
                  <p style={{ fontSize: "13px", color: "darkgray" }}></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
  );
};

export default MyTabs;
