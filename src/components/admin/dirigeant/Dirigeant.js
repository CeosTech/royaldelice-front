import React, { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import { sendrequest } from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import UpdateFormDirigeant from "./UpdateFormDirigeant.js";
import EditFormDirigeant from "./EditFormDirigeant.js";
import jwt_decode from "jwt-decode";
import "./dirigeant.css";

const Dirigeant = () => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [restaurantOwner, setRestaurantOwner] = useState([]);

  const token = localStorage.getItem("jwtToken");
  const id = jwt_decode("Bearer " + localStorage.getItem("jwtToken")).user_id;

  const fetchRestaurantOwner = async () => {
    console.log("test-get");
    console.log(token);
    const { data } = await axios.get(
      URL + "accounts/restaurantowner/" +
      id + "/", //avoir username = email
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("DEB");
    console.log(data);
    setRestaurantOwner(data[0]);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchRestaurantOwner();
    console.log(restaurantOwner);
  }, []);

  const RedirectionInfo = () => {
    let url = "/admin/mon-compte/infos-personnelles";
    history.push(url);
  };
  return (
    <div className="dirigeant">
      <div className="dirigeant-header">
        <i className="fas fa-arrow-left" onClick={RedirectionInfo}></i>
        <h1>Le dirigeant d'entreprise</h1>
      </div>
      {restaurantOwner !== undefined ? (
        <EditFormDirigeant />
      ) : (
        <UpdateFormDirigeant restaurantOwner={restaurantOwner} />
      )}
    </div>
  );
};
export default Dirigeant;
