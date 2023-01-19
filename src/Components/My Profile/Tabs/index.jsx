import React from "react";
import styles from "./styles.module.css";

const Tabs = ({components,setToggleChecked,Toggle}) => {

  return (
    <div className={styles.nav}>
      
      {components.map((data, index) => (
        <div
          key={index}
          onClick={() => setToggleChecked(index)}
          className={`${styles.item} ${Toggle === index ? `${styles.active}` : ``}`}
        >
          <p>{data.namePage}</p>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
