import React, { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { sendrequest, URL } from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import { TextField } from "@material-ui/core";

import "./societe.css";
import axios from "axios";

import UpdateFormSociete from "./UpdateFormSociete";
import EditFormSociete from "./EditFormSociete";
const initial = {
  denomination: "",
  adresse_siege: "",
  code_postal_siege: "",
  ville_siege: "",
  SIRET_number: "",
  etablissement: "",
  adresse_etablissement: "",
  code_postal_etablissement: "",
  ville_etablissement: "",
};
function Societe() {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [societe, setSociete] = useState([]);
  const [restaurantOwner, setRestaurantOwner] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = window.$token_access;
  const email = window.$email_dirigeant;

  const fetchRestaurantOwner = async () => {
    console.log("test-get");
    console.log(token);
    const { data } = await axios.get(
      "https://markus-app.herokuapp.com/accounts/restaurantowner/?email=" +
        email,
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

  useEffect(() => {
    fetchRestaurantOwner();
    return () => {
      setRestaurantOwner([]);
    };
  }, []);

  const RedirectionInfo = () => {
    let url = "/admin/mon-compte/infos-personnelles";
    history.push(url);
  };

  return (
    <div className="societe">
      <div className="societe-header">
        <i className="fas fa-arrow-left" onClick={RedirectionInfo}></i>
        <h1>La société</h1>
      </div>
      {restaurantOwner !== undefined ? (
        <EditFormSociete />
      ) : (
        <UpdateFormSociete restaurantOwner={restaurantOwner} />
      )}
    </div>
  );
}
export default Societe;
