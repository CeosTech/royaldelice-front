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
      <ProductList commandes={commandes} />
    </div>
  );
};

export default HistoriqueCommande;
