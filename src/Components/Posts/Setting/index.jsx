import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import {
  MdDeleteForever,
  MdMoreVert,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import AuthContext from "../../Config/AuthProvider";
import Loading from "../../../Loading/Loading";
import Edit from "./Edit";
import jwtDecode from "jwt-decode";

// const Setting = ({ userAbout, userId }) => {
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [loadingBlock, setLoadingBlock] = useState(false);
//   const { setPosts, posts } = useContext(AuthContext);

//
//   const tokencookie = Cookies.get("authorization");
//   const user = jwtDecode(tokencookie);
//   const onClickDeletePost = (userAbout) => {
//     let status;
//     axios
//       .put(
//         `http://localhost:5000/posts/trash/${userAbout}`,
//         { status },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + tokencookie,
//           },
//         }
//       )
//       .then((res) => {
//         setTimeout(() => {
//           setLoadingBlock(false);
//           setPosts(
//             posts.filter((val) => {
//               return val._id !== userAbout;
//             })
//           );
//           toast.success(res.data);
//         }, 2000);
//       })
//       .catch((err) => {
//         setTimeout(() => {
//           setLoadingBlock(false);
//         }, 2000);
//         toast(err.response.data, {
//           icon: "❌",
//           style: {
//             borderRadius: "10px",
//             background: "#ffcbcb",
//             color: "rgb(129, 35, 35)",
//             fontSize: "20px",
//             border: "solid 1px red",
//             fontWeight: "normal",
//           },
//         });
//       });
//   };
//   return (
//     <>
//       {loadingBlock && <div className={styles.block}></div>}
//       {loadingBlock && <Loading />}
//       <div ref={settingref}>
//       <MdMoreVert
//         className={styles.btnSetting}
//         onClick={() => setIsMenuOpen(!isMenuOpen)}

//       />
//       </div>
//       {isMenuOpen && (
//         <div className={styles.contanier} ref={menuref}>
//           {user.user.id === userId && (
//             <div className={styles.setting}>
//               <div
//                 className={styles.item}
//                 style={{ margin: "0", padding: "1px" }}
//               >
//                 <span style={{ margin: "10px" }}>
//                   <MdDeleteForever fontSize={25} />
//                 </span>
//                 <div
//                   className={styles.label}
//                   onClick={() => {
//                     onClickDeletePost(userAbout);
//                     setIsMenuOpen(false);
//                     setLoadingBlock(true);
//                   }}
//                 >
//                   <p style={{ fontSize: "19px" }}>Delete Post</p>
//                   <p style={{ fontSize: "13px", color: "darkgray" }}>
//                     The post will be permanently deleted
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div className={styles.setting}>
//             <div
//               className={styles.item}
//               style={{ margin: "0", padding: "1px" }}
//             >
//               <span style={{ margin: "10px" }}>
//                 <MdDeleteForever fontSize={25} />
//               </span>
//               <div className={styles.label} onClick={() => {}}>
//                 <p style={{ fontSize: "19px" }}>Report</p>
//                 <p style={{ fontSize: "13px", color: "darkgray" }}>
//                   The post will be permanently deleted
//                 </p>
//               </div>
//             </div>
//           </div>

//           {user.user.id === userId && (
//             <div className={styles.setting}>
//               <div
//                 className={styles.item}
//                 style={{ margin: "0", padding: "1px" }}
//               >
//                 <span style={{ margin: "10px" }}>
//                   <MdOutlineModeEditOutline fontSize={25} />
//                 </span>
//                 <div
//                   className={styles.label}
//                   onClick={() => {
//                     setIsEditOpen(true);
//                     setIsMenuOpen(false);
//                   }}
//                 >
//                   <p style={{ fontSize: "19px" }}>Edit Post</p>
//                   <p style={{ fontSize: "13px", color: "darkgray" }}>
//                     Click if You want To Editing Post
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       {isEditOpen && (
//         <Edit userAbout={userAbout} setIsEditOpen={setIsEditOpen} />
//       )}
//     </>
//   );
// };

// export default Setting;

const Setting = ({ userAbout, userId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loadingBlock, setLoadingBlock] = useState(false);
  const { setPosts, posts } = useContext(AuthContext);

  const tokencookie = Cookies.get("authorization");
  const user = jwtDecode(tokencookie);
  const onClickDeletePost = (userAbout) => {
    let status;
    axios
      .put(
        `http://localhost:5000/posts/trash/${userAbout}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          setLoadingBlock(false);
          setPosts(
            posts.filter((val) => {
              return val._id !== userAbout;
            })
          );
          toast.success(res.data);
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoadingBlock(false);
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
  };
  return (
    <div className="App">
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {loadingBlock && <div className={styles.block}></div>}
          {loadingBlock && <Loading />}
          <MdMoreVert className={styles.btnSetting} />
        </div>

          <div className={styles.contanier} style={{
            opacity: !isMenuOpen ? "0" : "1",
            transform: !isMenuOpen ?  "translateY(-20px)":"translateY(0)" ,
            transition: "var(--speed) ease",
            transition: "all ease .2s ",
            visibility: !isMenuOpen ? "hidden" : "visible",
          }}>
            {user.user.id === userId && (
              <div className={styles.setting}>
                <div
                  className={styles.item}
                  style={{ margin: "0", padding: "1px" }}
                >
                  <span style={{ margin: "10px" }}>
                    <MdDeleteForever fontSize={25} />
                  </span>
                  <div
                    className={styles.label}
                    onClick={() => {
                      onClickDeletePost(userAbout);
                      setIsMenuOpen(false);
                      setLoadingBlock(true);
                    }}
                  >
                    <p style={{ fontSize: "19px" }}>Delete Post</p>
                    <p style={{ fontSize: "13px", color: "darkgray" }}>
                      The post will be permanently deleted
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.setting}>
              <div
                className={styles.item}
                style={{ margin: "0", padding: "1px" }}
              >
                <span style={{ margin: "10px" }}>
                  <MdDeleteForever fontSize={25} />
                </span>
                <div className={styles.label} onClick={() => { setIsMenuOpen(false)}}>
                  <p style={{ fontSize: "19px" }}>Report</p>
                  <p style={{ fontSize: "13px", color: "darkgray" }}>
                    The post will be permanently deleted
                  </p>
                </div>
              </div>
            </div>

            {user.user.id === userId && (
              <div className={styles.setting}>
                <div
                  className={styles.item}
                  style={{ margin: "0", padding: "1px" }}
                >
                  <span style={{ margin: "10px" }}>
                    <MdOutlineModeEditOutline fontSize={25} />
                  </span>
                  <div
                    className={styles.label}
                    onClick={() => {
                      setIsEditOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <p style={{ fontSize: "19px" }}>Edit Post</p>
                    <p style={{ fontSize: "13px", color: "darkgray" }}>
                      Click if You want To Editing Post
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
           {isEditOpen && (
        <Edit userAbout={userAbout} setIsEditOpen={setIsEditOpen} />
       )} 
    </div>
  );
};
// function DropdownItem(props) {
//   return (
//     <li className="dropdownItem">
//       <div className={styles.contanier} ref={menuref}>
//            {user.user.id === userId && (
//              <div className={styles.setting}>
//                <div
//                  className={styles.item}
//                  style={{ margin: "0", padding: "1px" }}
//                >
//                  <span style={{ margin: "10px" }}>
//                    <MdDeleteForever fontSize={25} />
//                  </span>
//                  <div
//                    className={styles.label}
//                    onClick={() => {
//                      onClickDeletePost(userAbout);
//                      setIsMenuOpen(false);
//                      setLoadingBlock(true);
//                    }}
//                  >
//                    <p style={{ fontSize: "19px" }}>Delete Post</p>
//                    <p style={{ fontSize: "13px", color: "darkgray" }}>
//                      The post will be permanently deleted
//                    </p>
//                  </div>
//                </div>
//              </div>
//            )}

//            {user.user.id === userId && (
//              <div className={styles.setting}>
//                <div
//                  className={styles.item}
//                  style={{ margin: "0", padding: "1px" }}
//                >
//                  <span style={{ margin: "10px" }}>
//                    <MdOutlineModeEditOutline fontSize={25} />
//                  </span>
//                  <div
//                    className={styles.label}
//                    onClick={() => {
//                      setIsEditOpen(true);
//                      setIsMenuOpen(false);
//                    }}
//                  >
//                    <p style={{ fontSize: "19px" }}>Edit Post</p>
//                    <p style={{ fontSize: "13px", color: "darkgray" }}>
//                      Click if You want To Editing Post
//                    </p>
//                  </div>
//                </div>
//              </div>
//            )}
// //         </div>
//     </li>
//   );
// }
export default Setting;
