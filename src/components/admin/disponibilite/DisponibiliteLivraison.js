import axios from "axios";
import { useEffect, useState } from "react";
import SwitchBtn from "../../switch/SwitchBtn";
import {URL} from "../../middlewares/request";

const DisponibiliteLivraison = () => {
  const [dispoLivraison, setDispoLivraison] = useState([]);

  const updateDisponibiliteLivraison = async (id, disponibilite) => {
    console.log(disponibilite);
    await axios.put(URL + "info_restaurant/"+ id +"/", {

      disponibilite_livraison: disponibilite,
    });
  };

  useEffect(() => {
    const fetchDispoLivraison = async () => {
      const { data } = await axios.get(
        URL + "info_restaurant/"
      );
      setDispoLivraison(data);
    };

    fetchDispoLivraison();

    return () => setDispoLivraison([]);
  }, []);

  return (
    <div className='historiqueCommande admin__container'>
         <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#04295d",
        }}>
        Disponibilité Livraison
      </h1>
      {dispoLivraison[0] != undefined ?
        <SwitchBtn
            val={dispoLivraison[0].disponibilite_livraison}
            action={updateDisponibiliteLivraison}
            item={dispoLivraison[0]}
        />
      :null}
    </div>
  );
};

export default DisponibiliteLivraison;
