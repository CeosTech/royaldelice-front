import axios from "axios";
import { useEffect, useState /*, useRef*/ } from "react";
import { useDispatch } from "react-redux";
import {
  changenouvelleCommandeLength,
  changeCommandeCoursLength,
} from "../../../app/Redux-slices/adminSlice";
import ProductList from "../product/ProductList";
import { URL } from "../../../middlewares/request";
//import ReactStopwatch from 'react-stopwatch';

const NouvelleCommande = () => {
  const dispatch = useDispatch();
  const [commandes, setCommandes] = useState([]);
  const [commandesEnCours, setCommandesEnCours] = useState([]);
  // const [running, setRunning] = useState(false);
  // const [currentTimeMin, setCurrentTimeMin] = useState(0);

  const fetchCommandes = async () => {
    const { data } = await axios.get(URL + "paiement/nouvelle-commande");
    setCommandes(data);
  };

  const fetchCommandesEnCours = async () => {
    const { data } = await axios.get(URL + "paiement/commande-encours");
    setCommandesEnCours(data);
  };

  useEffect(() => {
    // console.log("Commande: ",commandes)
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changenouvelleCommandeLength(commandes.length));
  }, [commandes, dispatch]);

  useEffect(() => {
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changeCommandeCoursLength(commandesEnCours.length));
  }, [commandesEnCours, dispatch]);

  useEffect(() => {
    fetchCommandesEnCours();
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

  const commande_est_vue = async (id) => {
    await axios.put(URL + "paiement/update-commande", {
      id,
      est_vue: true,
    });

    fetchCommandes();
    fetchCommandesEnCours();
  };

  return (
    <div className="nouvelleCommande admin__container">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#04295d",
        }}
      >
        {commandes.length
          ? "Vos Nouvelles Commandes"
          : "Pas de Nouvelles commandes"}
      </h1>

      <ProductList
        nouvelleCommande
        commandes={commandes}
        action={commande_est_vue}
        btn="confirmer"
      />
    </div>
  );
};

export default NouvelleCommande;
