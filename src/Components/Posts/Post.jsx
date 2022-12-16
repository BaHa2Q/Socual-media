import React, { useState } from "react";
import styles from "./styles.module.css";
import { AiOutlineMore, AiTwotoneStar } from "react-icons/ai";
import {BsBookmarkStar,BsFillBookmarkStarFill} from "react-icons/bs"
import {CiStar} from "react-icons/ci"
import {TiStarFullOutline} from "react-icons/ti"
const Post = () => {
  const Text =
    "Text deskriptif memberikan informasi tentang bagaimana sesuatu atau seseorang terlihat, text ini menggunakan kata-kata untuk menggambarkan sesuatu atau seseorang seperti apa.Text deskriptif juga memberikan fakta-fakta tentang bagaimana Bahasa Indonesia benar-benar digunakan sesuai dengan aturan serta bagaimana seharusnya text ini digunakan.";
  const [seeMore, setSeeMore] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [like,setLike ] = useState(false);


  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            color: "gold",
            fontSize: "40px",
            position: "absolute",
            right: "-16px",
            top: "-13px",
          }}
        >
          {like && <AiTwotoneStar />}
        </div>
        <div className={styles.header}>
          <div className={styles.detils}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              width={50}
              style={{ borderRadius: "50%" }}
            />
            <div style={{ marginLeft: "10px", color: "#ac21d2" }}>
              <p style={{ marginBottom: "10px" }}> Bahaa Qadan</p>
            </div>
          </div>
          <div className={styles.setting}>
           <AiOutlineMore />
          </div>
        </div>
        <div className={styles.contant}>
          <div className={styles.description}>
            <p style={{ color: "lightgray" }}>
              {seeMore ? Text : Text.substring(0, 100)}
              <span>
                {" "}
                {seeMore ? (
                  <a onClick={() => setSeeMore(false)} style={{ color: "white" }}>
                    See less
                  </a>
                ) : (
                  <a onClick={() => setSeeMore(true)} style={{ color: "white" }}>
                    See more...
                  </a>
                )}
              </span>
            </p>
          </div>
          <div className={styles.photo}>
            <img
              width={"100%"}
              height={"auto"}
              src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg"
            />
          </div>
          <div></div>
        </div>
        <div className={styles.measures}>
          <div style={{color:"lightgray"}} onClick={() => setLike(!like)}>
            {like? <TiStarFullOutline color="gold"/>:<CiStar/>}
          </div>
          <div style={{width:"100px",color:"lightpink"}} onClick={() => setBookmark(!bookmark)}>
           {bookmark ?<BsFillBookmarkStarFill/>:<BsBookmarkStar/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
