import axios from "axios";
import { useEffect, useState } from "react";
import ProductList from "../product/ProductList";
import {URL} from "../../../middlewares/request";

const HistoriqueCommande = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      const { data } = await axios.get(
        URL + "paiement/historique-commande"
      );
      setCommandes(data);
    };

    fetchCommandes();

    return () => setCommandes([]);
  }, []);

  return (
    <div className='historiqueCommande admin__container'>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#04295D",
        }}>
        {commandes.length > 0? "Historique des commandes" : "Pas de commanndes dans votre historique des commandes"}
      </h1>
      <ProductList commandes={commandes} />
    </div>
  );
};

export default HistoriqueCommande;
