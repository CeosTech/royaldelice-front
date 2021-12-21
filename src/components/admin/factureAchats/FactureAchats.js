import { useHistory } from "react-router-dom";
import "./factureAchats.css";
function FactureAchats() {
  const history = useHistory();
  const faireRedirectionCompta = () => {
    let url = "/admin/Comptabilite";
    history.push(url);
  };
  const RedirectionFactRegister = () => {
    let url = "/admin/Comptabilite/facture-achats/enregistrer-factures";
    history.push(url);
  };
  const Redirectionhistoriquefactures = () => {
    let url = "/admin/Comptabilite/facture-achats/HistoriqueFactures";
    history.push(url);
  };
  return (
    <div className="Facture_container">
      <div className="Facture-header">
        <i className="fas fa-arrow-left" onClick={faireRedirectionCompta}></i>
        <h1>Facture achats</h1>
      </div>
      <div className="Facture">
        <button className="button" onClick={RedirectionFactRegister}>
          Enregistrer une facture
        </button>
        <button className="button" onClick={Redirectionhistoriquefactures}>
          Historique des factures
        </button>
      </div>
    </div>
  );
}
export default FactureAchats;
