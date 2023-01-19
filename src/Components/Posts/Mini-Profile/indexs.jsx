import React, { Fragment, useContext, useRef, useState } from "react";
import styles from "./styles.module.css";
import { IoMdMail, IoMdPhonePortrait } from "react-icons/io";
import AuthContext from "../../Config/AuthProvider";
import { Link } from "react-router-dom";

const MineProfile = ({ userId }) => {
  const [isShown] = useState(false);

  const { profiles } = useContext(AuthContext);
  let menuRef = useRef();

  return (
    <Fragment>
      {profiles
        .filter((data) => data.userId === userId)
        .sort((a, b) => (a.rating > b.rating ? 1 : -1))
        .map(({ image, name, username }, index) => (
          <Fragment key={index}>
            <img
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
              src={image}
              onError={(e) =>
                (e.target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
              }
              alt=""
            />
            <div
              style={{
                marginLeft: "14px",
              }}
            >
              <span>
                <Link
                  className={styles.username}
                  key={index}
                  to={`/${username.replace(/ /gi, ".")}`}
                >
                  {name.replace(/\b[a-z]|_(?=\w)/g, (char) =>
                    char.toUpperCase()
                  )}
                </Link>

                {}
              </span>
            </div>
          </Fragment>
        ))
        .reverse()}
      {isShown && (
        <div className={styles.wrapper} ref={menuRef}>
          <div>
            <img
              style={{ width: "100%", height: "76px" }}
              src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
              onError={(e) =>
                (e.target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
              }
              alt=""
            />
          </div>

          <img
            className={styles.imgProfile}
            src="https://images.unsplash.com/photo-169aa?ixlib=rb-4d.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            onError={(e) =>
              (e.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            }
            alt=""
          />

          <p className={styles.header}>Bahaa Qadan</p>
          <div className={styles.titles}>
            <p className={styles.t1}>
              <IoMdMail style={{ margin: "-3px", marginRight: "12px" }} />
              bahaaqadan2000@gmail.com
            </p>
            <p className={styles.t1}>
              <IoMdPhonePortrait
                style={{ margin: "-3px", marginRight: "12px" }}
              />
              +97054712344
            </p>
          </div>
          <div className={styles.footer}>
            <button className={styles.btnProfil}>Profile</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MineProfile;
