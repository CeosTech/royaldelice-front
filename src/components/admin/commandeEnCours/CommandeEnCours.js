import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../product/ProductList";
import {URL} from "../../../middlewares/request";
import {
        changenouvelleCommandeLength,
        changeCommandeCoursLength,
        selectAdmin,
        changePage
    } from "../../../app/Redux-slices/adminSlice";

const CommandeEnCours = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const [commandes, setCommandes] = useState([]);
  const [nouvellesCommandes, setNouvellesCommandes] = useState([]);

  const fetchCommandes = async () => {
    const { data } = await axios.get(
      URL+"paiement/commande-encours",
    );
    setCommandes(data);
  };

  const fetchNouvellesCommandes = async () => {
    const { data } = await axios.get(
      URL+"paiement/nouvelle-commande"
    );
    setNouvellesCommandes(data);
  };

  useEffect(() => {
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changenouvelleCommandeLength(nouvellesCommandes.length));
  }, [nouvellesCommandes, dispatch]);

  useEffect(() => {
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    dispatch(changeCommandeCoursLength(commandes.length));
  }, [commandes, dispatch]);

  useEffect(() => {
    fetchCommandes();
    let timeoutId;
    function getLatestCommandes() {
      fetchNouvellesCommandes();

      // wait for the response from fetchCommandes , before we recall it (delay of 1minute)
      timeoutId = setTimeout(getLatestCommandes, 1000 * 60);
    }
    getLatestCommandes();

    return () => {
      clearTimeout(timeoutId);
      setCommandes([]);
      setNouvellesCommandes([]);
    };
  }, []);


  const commande_est_livre = async (id, livre) => {
    await axios.put(URL+"paiement/update-commande", {
      id,
      est_livre: true,
      livre: livre
    });

    fetchCommandes();
  };

  return (
    <div className='commande-en-cours admin__container'>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#04295D",
        }}>
        {commandes.length ? "Vos Commandes en cours" : "Pas de Commandes en cours"}
      </h1>
      <ProductList
        commandes={commandes}
        action={commande_est_livre}
        btn={"Remise au client"}
        btnImprimer={"Imprimer facture"}
        estPrisConnaissance
      />
    </div>
  );
};

export default CommandeEnCours;
