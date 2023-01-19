import React, { Fragment, useContext, useState } from "react";
import styles from "./styles.module.css";
import AuthContextProfile from "../../Config/AuthProviderProfile";
import axios from "axios";
import Cookies from "js-cookie";
import { BsFillPersonPlusFill, BsPersonCheckFill } from "react-icons/bs";

import { AiOutlineClose } from "react-icons/ai";

const Follower = ({ profileId }) => {
  const { friend, waitting } = useContext(AuthContextProfile);
  const isLike = friend.filter(
    (data) => data.profileId === profileId.toString()
  );
  const isLike2 = waitting.filter(
    (data) => data.profileId === profileId.toString()
  );
  const [stars, setStars] = useState(isLike.length > 0 ? true : false);
  const [wait] = useState(isLike2.length > 0 ? true : false);
    console.log(isLike);
  const tokencookie = Cookies.get("authorization");
  function ClickForAdd(profileId, users) {
    axios
      .post(
        `http://localhost:5000/friends/Add/${profileId}`,
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
  function ClickForDelete(profileId, users) {
    axios
      .delete(
        `http://localhost:5000/friends/reject/${profileId}`,

        {
          headers: {
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
      });
  }
  if (wait === true) {
    return (
      <div style={{ color: "lightgray" }}>
        <button
          className={`${styles.btnMethod} ${styles.friend}`}
          onClick={() => {
            {
              setStars(false);
            }
          }}
        >
          Friend <BsPersonCheckFill className={styles.loader} />
        </button>
      </div>
    );
  }
  return (
    <Fragment>
      <div style={{ color: "lightgray" }}>
        <>
          {stars ? (
            <div>
              <div>
                <button className={`${styles.btnMethod} ${styles.friend}`}>
                  waitting <BsPersonCheckFill className={styles.loader} />
                </button>
                <button
                  className={`${styles.btnMethod} ${styles.friend}`}
                  style={{ padding: "9px 10px", margin: 0 }}
                  onClick={() => {
                    {
                      setStars(false);
                      ClickForDelete(profileId)
                    }
                  }}
                >
                  <AiOutlineClose className={styles.loader} />
                </button>
              </div>
            </div>
          ) : (
            <button
              className={`${styles.btnMethod} ${styles.unfriend}`}
              onClick={() => {
                {
                  setStars(true);
                  ClickForAdd(profileId);
                }
              }}
            >
              Add Friend <BsFillPersonPlusFill />
            </button>
          )}
        </>
      </div>
    </Fragment>
  );
};

export default Follower;
