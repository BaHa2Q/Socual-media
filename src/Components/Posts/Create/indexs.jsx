import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { BiImageAdd } from "react-icons/bi";
import { FiPaperclip } from "react-icons/fi";
import { MdOutlineError } from "react-icons/md";
import AuthContext from "../../Config/AuthProvider";
import Loading from "../../../Loading/Loading";
import jwtDecode from "jwt-decode";

const CreatePost = () => {
  const { setPosts, posts } = useContext(AuthContext);
  
  const [text, setText] = useState("");
  const [loadingBlockCreate, setLoadingCreate] = useState(false);
  
  // const [validator,setValidator] = useState("");
  const tokencookie = Cookies.get("authorization");
  const textareaRef = useRef(null);
  const [validatorbox, setValidatorbox] = useState(false);
  const validator = (
    <>
      `A status can't be longer than 63,206 characters, but this one is{" "}
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
        {text.length}
      </span>
      characters long. Please make it a little shorter and try again.`
    </>
  );
  const Test = jwtDecode(tokencookie);
  function handleSubmit(event) {
    event.preventDefault();
    const text = textareaRef.current.value;
    if (text.length < 1) {
      setValidatorbox(true);
    } else {
      axios
        .post(
          "http://localhost:5000/posts/create",
          { text },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokencookie,
            },
          }
        )

        .then((response) => {
          setLoadingCreate(true);
          setTimeout(() => {
            setLoadingCreate(false);
            setPosts([...posts, response.data]);
          
          }, 3000);
        })

        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
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
  }, [text]);

  return (
    <div className={styles.wrapper}>
      <h2>New Post</h2>
      <hr />
      <div className={styles.cover}>
        <div className={styles.body}>
          {loadingBlockCreate && <div className={styles.block}></div>}
          {loadingBlockCreate && <Loading />}
          <textarea
            ref={textareaRef}
            onChange={(e) => setText(e.target.value)}
            placeholder={`What's on your mide,${Test.user.name}`}
            style={
              validatorbox
                ? { border: `1px solid rgb(255, 87, 87)` }
                : { border: `none` }
            }
            value={text}
            maxLength={40788}
          />
        </div>
        <div className={styles.tools}>
          <button className={styles.btn}>
            <i>
              <BiImageAdd />
            </i>
            Photo/video
          </button>
          <button className={styles.btn}>
            <i>
              <FiPaperclip />
            </i>
            File
          </button>
        </div>
      </div>
      <div className={styles.Method}>
        <button onClick={handleSubmit} className={styles.btnMethod}>
          Create
        </button>
        <p>
          {text.length > 40787 && (
            <>
              <MdOutlineError fontSize={30} />
              <div> {validator}</div>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default CreatePost;
