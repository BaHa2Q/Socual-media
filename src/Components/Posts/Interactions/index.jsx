import React, { Fragment, useContext, useState } from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";
import AuthContext from "../../Config/AuthProvider";

const Interactions = ({ star, user,_id }) => {
  const {liked} = useContext(AuthContext)
  const isLike = liked.filter(data => data.postId === _id)
  const [bookmark, setBookmark] = useState(false);
  const [stars, setStars] = useState(isLike.length > 0 ? true : false);
  return (
    <Fragment>
      <div
        style={{ color: "lightgray" }}
        onClick={() => {
          setStars(!stars);
        }}
      >
        {stars ? <TiStarFullOutline color="gold" /> : <CiStar />}
      </div>

      <div
        style={{ width: "100px"}}
        onClick={() => setBookmark(!bookmark)}
      >
        {bookmark ? <BsFillBookmarkStarFill color="lightpink"/> : <BsBookmarkStar  color="gray" />}
      </div>
    </Fragment>
  );
};

export default Interactions;
