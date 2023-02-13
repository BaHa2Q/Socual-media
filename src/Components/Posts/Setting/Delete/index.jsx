import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { MdOutlineError } from "react-icons/md";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import Verification from "../../../hook/Modal/Verification";

const Edit = ({ userAbout ,setIsEditOpen}) => {
  const [edit ,setEdit] = useState([])
  const [text,setNewText] = useState("")
  const [save,setSave] = useState(false)
  const tokencookie = Cookies.get("authorization");
  const textareaRef = useRef(null);
  const [validatorbox, setValidatorbox] = useState(false);
  const [spam, setSpam] = useState(false);
  const validator = (
    <>
      `A status can't be longer than 63,206 characters, but this one is{" "}
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
        {text.length}
      </span>
      characters long. Please make it a little shorter and try again.`
    </>
  );


  const onClickUpdatePost = () => {
    if (text.length < 1) {
      setValidatorbox(true);
    } else {
    axios
      .put(
        `http://localhost:5000/posts/edit/${edit._id}`,
        {text},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => {
        setSave(true)
       
        setTimeout(() => {
          setSave(false)
          setIsEditOpen(false)
        }, 6000);
      })
      .catch((err) => {
        setTimeout(() => {
        }, 2000);
        toast(err.response.data, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#ffcbcb",
            color: "rgb(129, 35, 35)",
            fontSize: "20px",
            border: "solid 1px red",
            fontWeight: "normal",
          },
        });
      });
    }
  };
 
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/posts/edit/${userAbout}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => {
        setEdit(res.data)
        setNewText(res.data.text);
      })
      .catch((err) => {
        setTimeout(() => {
        }, 2000);
        toast(err.response.data, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#ffcbcb",
            color: "rgb(129, 35, 35)",
            fontSize: "20px",
            border: "solid 1px red",
            fontWeight: "normal",
          },
        });
      });
    if (text.length > 1) {
      setValidatorbox(false);
    }
    function handleInput() {
      const textarea = textareaRef.current;
      textarea.style.height = "110px";

      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const textarea = textareaRef.current;
    textarea.addEventListener("input", handleInput);

    return () => {
      textarea.removeEventListener("input", handleInput);
    };

  }, [text,tokencookie,userAbout]);

  return (
    <>
      <div  className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>

            <span className={styles.close} onClick={() => setIsEditOpen(false)}>&times;</span>
            <h2>Edit Post</h2>
          </div>
          <div className={styles.alert}>{spam && <p style={{ fontSize: "20px", fontWeight: "bold" }}>Dont Spam  <span className={styles.close} onClick={() => setSpam(false)}>&times;</span></p>}</div>
          <div className={styles.modalBody}>
            <textarea
            ref={textareaRef}
            value={text} onChange={(e) => setNewText(e.target.value)}
            placeholder={`What's on your mide`}
            style={
              validatorbox
                ? { border: `1px solid rgb(255, 87, 87)` }
                : { border: `1px solid #696969` }
            }
            maxLength={40788}
          />
          </div>

          {text.length > 40787 && (
            <>
              <MdOutlineError fontSize={30} />
              <div> {validator}</div>
            </>
          )}
          <div className={styles.modalFooter}>
          <button className={`${styles.btnMethod} ${styles.save}`} disabled={save} onClick={onClickUpdatePost} onDoubleClick={() =>setSpam(true)}>Save {save &&<AiOutlineLoading3Quarters className={styles.loader}/>}</button>
          
          <button className={`${styles.btnMethod} ${styles.close}`}  onClick={() => setIsEditOpen(false)}>Close </button>
          </div>
        </div>
      </div>
	  

    </>
  );
};

export default Edit;
