import { useHistory } from "react-router-dom";

import "./contratdetravail.css";
function Contratdetravail() {
  const history = useHistory();
  const Redirection = () => {
    let url = "/admin/Gestion_des_ressources_humaines";
    history.push(url);
  };
  const fRedirection = () =>{ 
    let url = "/admin/Gestion_des_ressources_humaines/Contratdetravail/Creationcdi";
    history.push(url);
  };


  return (
    <div className="Contratdetravail">
      <i className="fas fa-arrow-left " onClick={Redirection}></i>
      <div className="Contratdetravail-header">
        <h1>Contrat de travail</h1>
      </div>
      <div className="infos_button">
        <button className="button"onClick={fRedirection} >
          Création CDI
        </button>
        <button className="button">
          Création CDD
        </button>
        <button className="button">
          DPAE 
        </button>
      </div>
    </div>
  );
}
export default Contratdetravail;