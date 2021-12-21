import { useHistory } from "react-router-dom";

import "./Gestioncommerciale.css";
function Gestioncommerciale() {
  const history = useHistory();
  const faireRedirection = () => {
    let url = "/admin/Gestion_commerciale";
    history.push(url);
  };

  return (
    <div className="Container">
      <div className="Gestioncommerciale-header">
        <h1>Gestion commerciale</h1>
      </div>
      <div className="Gestioncommerciale">
        <button className="button" onClick={faireRedirection}>
          Établir un devis
        </button>
        <button className="button">Établir une facture</button>
        <button className="button">Envoyer une Newsletter</button>

        <button className="button">Historique des devis</button>

        <button className="button">Historique des factures</button>
      </div>
    </div>
  );
}
export default Gestioncommerciale;
