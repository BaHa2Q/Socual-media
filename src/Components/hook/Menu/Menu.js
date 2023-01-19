import React from "react";
import Conten from "./Conten";
import styles from "./styles.module.css";

const Menu = (props) => {

  return (
    <div>

      <div className={styles.contanier} style={{
        zIndex: 1,
        opacity: !props.open ? "0" : "1",
        transform: !props.open ? "translateY(-20px)" : "translateY(0)",
        transition: "var(--speed) ease",
        transition: "all ease .2s ",
        visibility: !props.open ? "hidden" : "visible",
      }}>
        <div className={styles.setting}>
          <h2 style={{ margin: 0 }}>{props.title}</h2>
          <hr />
          {props.contant}
        </div>
      </div>
    </div>
  );
};


export default Menu