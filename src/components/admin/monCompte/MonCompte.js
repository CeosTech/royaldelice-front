import { useHistory } from "react-router-dom";

import "./monCompte.css";
function MonCompte() {
  const history = useHistory();
  const faireRedirection = () => {
    let url = "/admin/mon-compte/infos-personnelles";
    history.push(url);
  };

  return (
    <div className="Container">
      <div className="compte-header">
        <h1> Mon compte </h1>
      </div>
      <div className="compte">
        <button className="button" onClick={faireRedirection}>
          Informations personnelles
        </button>
        <button className="button">Factures Markus</button>
        <button className="button">Support client</button>
      </div>
    </div>
  );
}
export default MonCompte;
