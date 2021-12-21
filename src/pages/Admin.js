import React, { useEffect, useState } from "react";
import {
  changenouvelleCommandeLength,
  changeCommandeCoursLength,
} from "../app/Redux-slices/adminSlice";

import AdminPage from "../components/admin";
// import AdminPage from "./AdminPage";
import axios from "axios";
import { URL } from "../middlewares/request";
import { /*Route, Switch,*/ useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../app/Redux-slices/adminSlice";
//import Global_admin from "../app/Redux-slices/adminSlice";

const Admin = () => {
  const [commandes, setCommandes] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchCommandes = async () => {
    const { data } = await axios.get(URL + "paiement/nouvelle-commande");
    setCommandes(data);
  };
  useEffect(() => {
    // console.log("Commande: ",commandes)
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changenouvelleCommandeLength(commandes.length));
  }, [commandes, dispatch]);
  useEffect(() => {
    let timeoutId;
    function getLatestCommandes() {
      fetchCommandes();

      // wait for the response from fetchCommandes , before we recall it (delay of 1minute)
      timeoutId = setTimeout(getLatestCommandes, 1000 * 60);
    }
    getLatestCommandes();

    return () => {
      clearTimeout(timeoutId);
      setCommandes([]);
    };
  }, []);

  return (
        <AdminPage />
      )
};

export default Admin;
