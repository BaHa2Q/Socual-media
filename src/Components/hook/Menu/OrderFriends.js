import React from "react";
import styles from "./styles.module.css";

const OrderFriends = (props) => {

  return (
    <div
      className={styles.item}
      onClick={props.event}
      style={{ margin: "0", padding: "9px" }}
    >
      <span style={{ margin: "10px" }}>{props.icon}</span>
      <div className={styles.label}>
        <p style={{ fontSize: "19px" }}>{props.name}</p>
        <p style={{ fontSize: "13px", color: "darkgray" }}>
          {props.CreateTime}
        </p>
      </div>
      <div className={styles.Method}>
        <button
          style={{ backgroundColor: "#3d59d4" }}
          className={styles.btnMethod}
		  onClick={props.config}
        >
          config
        </button>
        <button
          style={{ backgroundColor: "#3d5934" }}
          className={styles.btnMethod}
		  onClick={props.reject}
        >
          refaj
        </button>
      </div>
    </div>
  );
};

export default OrderFriends;
