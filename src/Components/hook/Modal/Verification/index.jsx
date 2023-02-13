import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./styles.module.css";

const Verification = (props) => {
  const [save, setSave] = useState(false);
  function handleSave(params) {
    setSave(true)(props.event);
  }
  useEffect(() => {
    setTimeout(() => {
      setSave(false);
    }, 10000);
  });

  return (
    <>
      <div className={styles.modal}>
        {/* <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Edit Post</h2>
          </div>
          <div className={styles.modalBody}></div>

          <div className={styles.modalFooter}>
            <button
              className={`${styles.btnMethod} ${styles.save}`}
              disabled={save}
              onClick={handleSave}
            >
              Save
              {save && <AiOutlineLoading3Quarters className={styles.loader} />}
            </button>
            <button
              className={`${styles.btnMethod} ${styles.close}`}
              onClick={props.cancel}
            >
              Close
            </button>

          </div>
        </div> */}
        <div className={styles.modalContent}>dwa</div>
      </div>
    </>
  );
};

export default Verification;
