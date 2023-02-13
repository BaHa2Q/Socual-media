import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import AuthContextProfile from "../../../Config/AuthProviderProfile";
import "./styles.module.css";

const ViewPostInTrash = () => {
  const {auth,apiURL} = useContext(AuthContextProfile)
  const [trash, setTrash] = useState([]);

  useEffect(() => {
	axios.get(`${apiURL}/posts/trash`, {
		headers: {
		  Authorization: `Bearer ${auth}`,
		},
	  }).then(res => setTrash(res.data));
  }, [])
  

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
