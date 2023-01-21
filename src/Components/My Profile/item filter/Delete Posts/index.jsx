import React, { Fragment, useContext } from "react";
import AuthContextProfile from "../../../Config/AuthProviderProfile";
import "./styles.module.css";

const ViewPostInTrash = () => {
  const {trash} = useContext(AuthContextProfile)
  console.log(trash);
  return (
    <Fragment>
          {trash.map((data,index) => 
          <div key={index}>
            {data._id}
          </div>
          )}
    </Fragment>
  );
};

export default ViewPostInTrash;
