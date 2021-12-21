import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ListClient from "./ListClient";
import "./client.css";
import {URL} from "../../../middlewares/request";

const BddClient = () => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState([]);
  const [running, setRunning] = useState(false);
  const [currentTimeMin, setCurrentTimeMin] = useState(0);

  const fetchClients = async () => {
    const { data } = await axios.get(
        URL + "paiement/create-client-secret"
    );
    setClients(data);
  };


  useEffect(() => {
    //let timeoutId;
    //function getLatestContacts() {
      fetchClients();

      // wait for the response from fetchContacts , before we recall it (delay of 1minute)
      //timeoutId = setTimeout(getLatestContacts, 1000 * 60);
    //}
    //getLatestContacts();

    return () => {
      //clearTimeout(timeoutId);
      setClients([]);
    };
  }, []);


      return (
        <div className='nouvelleCommande admin__container'>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "rgb(86 85 85)",
            }}>
            {/*commandes.length
              ? "Vos Nouvelles Commandes"
              : "Pas de Nouvelles commandes"*/}
          </h1>

          <ListClient
            clients={clients}
          />
        </div>
      );
};

export default BddClient;
