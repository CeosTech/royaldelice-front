import { useHistory } from "react-router-dom";

import "./infoPerso.css";

function InfoPerso() {
  const history = useHistory();

  const RedirectionSociete = () => {
    let url = "/admin/mon-compte/infos-personnelles/la-societe";
    history.push(url);
  };

  const RedirectionCaisse = () => {
    let url = "/admin/mon-compte/infos-personnelles/caisse";
    history.push(url);
  };

  const RedirectionDirigeant = () => {
    let url = "/admin/mon-compte/infos-personnelles/dirigeant";
    history.push(url);
  };
  const RedirectionCompte = () => {
    let url = "/admin/mon-compte";
    history.push(url);
  };

  return (
    <div className="infos">
      <i className="fas fa-arrow-left " onClick={RedirectionCompte}></i>
      <div className="infos_header">
        <h1>Informations personnelles</h1>
      </div>
      <div className="infos_button">
        <button className="button" onClick={RedirectionSociete}>
          La société
        </button>
        <button className="button" onClick={RedirectionCaisse}>
          Caisse de retraite
        </button>
        <button className="button" onClick={RedirectionDirigeant}>
          Le dirigeant de l'entreprise
        </button>
      </div>
    </div>
  );
}

export default InfoPerso;
