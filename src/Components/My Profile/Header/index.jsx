import React, { Fragment} from "react";
import styles from "./styles.module.css";


export const ContextHeader = ({profile}) => {
  
  return (
    <Fragment>
      <div className={styles.cover}>
        <img
          id="#zoom-In"
          width={"100%"}
          src={profile.background === undefined ? "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg?w=2000": profile?.background   }
          onError={(e) =>
            (e.target.src =
              "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg?w=2000")
          }
          alt=""
        />
      </div>
      <div className={styles.imgprofile}>
        <img
          src={profile.image}
          alt=""
        />

        <p
          style={{
            fontSize: "31px",
            margin: "0px",
            marginTop: "0px",
            textAlign: "center",
            color: "white",
          }}
        >
         {profile.name}
        </p>
      </div>
    </Fragment>
  );
};

export default ContextHeader;
