import React, { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import { sendrequest } from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import UpdateFormCaisse from "./UpdateFormCaisse.js";
import EditFormCaisse from "./EditFormCaisse.js";
import "./caisse.css";

const Caisse = () => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [restaurantOwner, setRestaurantOwner] = useState([]);

  const token = window.$token_access;
  const email = window.$email_dirigeant;

  const fetchRestaurantOwner = async () => {
    console.log("test-get");
    console.log(token);
    const { data } = await axios.get(
      "https://markus-app.herokuapp.com/accounts/restaurantowner/?email=" +
        email, //avoir username = email
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
    <div className="caisse">
      <div className="caisse-header">
        <i className="fas fa-arrow-left" onClick={RedirectionInfo}></i>
        <h1>La caisse de retraite</h1>
      </div>
      {restaurantOwner !== undefined ? (
        <EditFormCaisse />
      ) : (
        <UpdateFormCaisse restaurantOwner={restaurantOwner} />
      )}
    </div>
  );
};
export default Caisse;
