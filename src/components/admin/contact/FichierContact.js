import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ListeContact from "./ListeContact";
import "./contact.css";
import {URL} from "../../../middlewares/request";


const FichierContact = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [running, setRunning] = useState(false);
  const [currentTimeMin, setCurrentTimeMin] = useState(0);

  const fetchContacts = async () => {
    const { data } = await axios.get(
      URL + "restaurant/contact/"
    );
    setContacts(data);
  };


  useEffect(() => {
    //let timeoutId;
    //function getLatestContacts() {
      fetchContacts();

      // wait for the response from fetchContacts , before we recall it (delay of 1minute)
      //timeoutId = setTimeout(getLatestContacts, 1000 * 60);
    //}
    //getLatestContacts();

    return () => {
      //clearTimeout(timeoutId);
      setContacts([]);
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
          <ListeContact
            contacts={contacts}
          />

        </div>
      );
};

export default FichierContact;
