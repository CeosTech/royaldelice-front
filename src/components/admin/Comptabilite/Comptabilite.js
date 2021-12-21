import { useHistory } from "react-router-dom";

import "./Comptabilite.css";
function Comptabilite() {
  const history = useHistory();
  /*const faireRedirection = () => {
    let url = "/admin/Comptabilite/facture-achats";
    history.push(url);
  };*/
  
   const Redirectionhistoriquefactures = () => {
    let url = "/admin/Comptabilite/facture-achats/HistoriqueFactures";
    history.push(url);
  };
  
    
  const RedirectionFactRegister = () => {
    let url = "/admin/Comptabilite/facture-achats/enregistrer-factures";
    history.push(url);
  };
  
  return (
    <div className="Comptabilite">
      <div className="Comptabilite-header">
        <h1>Comptabilité</h1>
      </div>

      <div className="Comptabilite-button">
        <button className="button">Rapport de TVA</button>
        <button className="button" onClick={RedirectionFactRegister}>
          Enregistrer facture
        </button>
        <button className="button" onClick={Redirectionhistoriquefactures}>Historique des factures</button>
      </div>
    </div>
  );
}
export default Comptabilite;

