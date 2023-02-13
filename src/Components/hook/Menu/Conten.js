import React from "react";
import styles from "./styles.module.css";

const Conten = (props) => {
  return (
	<div className={styles.item} onClick={props.event}  style={{ margin: "0", padding: "9px" }} >
	<span style={{ margin: "10px" }}>{props.icon}</span>
	<div className={styles.label} >
	  <p style={{ fontSize: "19px" }}>{props.name}</p>
	  <p style={{ fontSize: "13px", color: "darkgray" }}>{props.desc}</p>
	</div>
  </div>
  );
};

export default Conten;
