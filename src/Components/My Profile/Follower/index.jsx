import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import AuthContextProfile from "../../Config/AuthProviderProfile";
import axios from "axios";
import Cookies from "js-cookie";
import { BsFillPersonPlusFill, BsPersonCheckFill } from "react-icons/bs";

import { AiOutlineClose } from "react-icons/ai";

const Follower = ({ profileId, userId }) => {
  const { friendprofile,myprofile, waitting } = useContext(AuthContextProfile);
  // const isLike = .filter(
  //   (data) => data.friendprofileId === profileId.toString()
  // );
  // const isLike2 = waitting.filter(
  //   (data) => data.friendprofileId === profileId.toString()
  // );
  const oneFriendprofileId = myprofile.filter(
    ({ friendprofileId }) => friendprofileId.toString() === profileId
  );
	console.log(oneFriendprofileId);
  const oneprofileId = friendprofile.filter(
    ({ profileId: myprofileId }) => myprofileId.toString() === profileId
  );

  const [addFriend, setAddFriend] = useState(
    oneFriendprofileId.length === 0 && oneprofileId.length === 0 ? true : false
  );
  const [friendle, setFriendle] = useState(
    oneprofileId.filter(({ request }) => request === true).length > 0 ||
      oneFriendprofileId.filter(({ request }) => request === true).length > 0
      ? true
      : false
  );
  const [wait, setWait] = useState(
    oneFriendprofileId.filter(({ request }) => request === null).length > 0
      ? true
      : false
  );
  const [action, setAction] = useState(
    oneprofileId.filter(({ request }) => request === null).length > 0
      ? true
      : false
  );
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

  function ClickForDelete(profileId) {
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
  let request;
  function ClickForAgree() {
    axios
      .put(
        `http://localhost:5000/order/agree`,
        { request },
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
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const tokencookie = Cookies.get("authorization");
    axios
      .get(
        `http://localhost:5000/notification/friend`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => setNotification(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (addFriend) {
    return (
      <div style={{ color: "lightgray" }}>
        <>
          <button
            className={`${styles.btnMethod} ${styles.unfriend}`}
            onClick={() => {
              {
                setAddFriend(false);
                setWait(true)
                ClickForAdd(profileId);
              }
            }}
          >
            Add Friend <BsFillPersonPlusFill />
          </button>
        </>
      </div>
    );
  } else if (wait) {
    return (
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
                setAddFriend(true);
                ClickForDelete(profileId);
              }
            }}
          >
            <AiOutlineClose se className={styles.loader} />
          </button>
        </div>
      </div>
    );
  } else if (action) {
    return (
      <div style={{ color: "lightgray" }}>
        <button
          className={`${styles.btnMethod} ${styles.friend}`}
          style={{ background: "red" }}
          onClick={() =>{ ClickForAgree(userId);setAction(false);setFriendle(true)}}
        >
          Agree <BsPersonCheckFill className={styles.loader} />
        </button>
        <button
          className={`${styles.btnMethod} ${styles.friend}`}
          style={{ background: "blue" }}
          onClick={() => { ClickForDelete(userId);setAddFriend(true)}}
        >
          Reject <BsPersonCheckFill className={styles.loader} />
        </button>
      </div>
    );
  } else if (friendle) {
    return (
      <div style={{ color: "lightgray" }}>
        <button
          className={`${styles.btnMethod} ${styles.friend}`}
          onClick={() =>{ ClickForDelete(userId);setAddFriend(true)}}
        >
          Friend <BsPersonCheckFill className={styles.loader} />
        </button>
      </div>
    );
  }

  // if (
  //   oneFriendprofileId.filter(({ request }) => request === false).length > 0
  // ) {
  //   return (
  //     <div>
  //       <div>
  //         <button className={`${styles.btnMethod} ${styles.friend}`}>
  //           waitting <BsPersonCheckFill className={styles.loader} />
  //         </button>
  //         <button
  //           className={`${styles.btnMethod} ${styles.friend}`}
  //           style={{ padding: "9px 10px", margin: 0 }}
  //           onClick={() => {
  //             {
  //               // setStars(false);
  //               ClickForDelete(profileId);
  //             }
  //           }}
  //         >
  //           <AiOutlineClose className={styles.loader} />
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  // if (oneprofileId.filter(({ request }) => request === false).length > 0) {
  //   return (
  //     <div style={{ color: "lightgray" }}>
  //       <button
  //         className={`${styles.btnMethod} ${styles.friend}`}
  //         style={{ background: "red" }}
  //         onClick={() => ClickForAgree(userId)}
  //       >
  //         Agree <BsPersonCheckFill className={styles.loader} />
  //       </button>
  //       <button
  //         className={`${styles.btnMethod} ${styles.friend}`}
  //         style={{ background: "blue" }}
  //         onClick={() => ClickForDelete(userId)}
  //       >
  //         Reject <BsPersonCheckFill className={styles.loader} />
  //       </button>
  //     </div>
  //   );
  // }
  // if (friendle) {
  //   return (
  //     <div style={{ color: "lightgray" }}>
  //       <button
  //         className={`${styles.btnMethod} ${styles.friend}`}
  //         onClick={() => {
  //           {
  //             // setStars(false);
  //             ClickForDelete(userId);
  //           }
  //         }}
  //       >
  //         Friend <BsPersonCheckFill className={styles.loader} />
  //       </button>
  //     </div>
  //   );
  // }
  // if (oneprofileId.filter(({ request }) => request === true).length > 0 && oneFriendprofileId.filter(({ request }) => request === true).length > 0) {
  //   return (
  //     <div style={{ color: "lightgray" }}>
  //     <button
  //       className={`${styles.btnMethod} ${styles.friend}`}
  //       onClick={() => {
  //         {
  //           // setStars(false);
  //         }
  //       }}
  //     >
  //       Friend <BsPersonCheckFill className={styles.loader} />
  //     </button>
  //     </div>
  //   );
  // }
};

export default Follower;
{
  /* <div style={{ color: "lightgray" }}>
<button
  className={`${styles.btnMethod} ${styles.friend}`}
  style={{ background: "red" }}
  onClick={() => ClickForAgree(userId)}
>
  Agree <BsPersonCheckFill className={styles.loader} />
</button>
<button
  className={`${styles.btnMethod} ${styles.friend}`}
  style={{ background: "blue" }}
  onClick={() => ClickForDelete(userId)}
>
  Reject <BsPersonCheckFill className={styles.loader} />
</button>
</div> */
}
{
  /* <div style={{ color: "lightgray" }}>
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
</div> */
}
{
  /* <div style={{ color: "lightgray" }}>

<>
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
</>



</div> */
}
{
  /* <div>
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
        ClickForDelete(profileId);
      }
    }}
  >
    <AiOutlineClose className={styles.loader} />
  </button>
</div>
</div> */
}
