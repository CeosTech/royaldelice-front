

import { useHistory } from "react-router-dom";

import './Gestiondesrh.css'
function Gestiondesressourceshumaines() {

  const history = useHistory();
  const faireRedirection = () =>{ 
    let url = "/admin/Gestion_des_ressources_humaines";
    history.push(url);
  }
  const Redirection = () =>{ 
    let url = "/admin/Gestion_des_ressources_humaines/Contratdetravail";
    history.push(url);
  }


  return (
    <div className="Container">

        <div className="Gestiondesressourceshumaines-header">
            <h1>Gestion du personnel</h1>
        </div>
        <div className='Gestiondesressourceshumaines'>

                <button className="rh_button"onClick={faireRedirection}>
                    Lettres types
                </button>
                <button className="rh_button">
                   Registre du personnel
                </button>
                <button className="rh_button"onClick={Redirection}>
                  Contrat de travail
                </button>
                <button className="rh_button">
                  Historique émargement 
                </button>
                <button className="rh_button">
                  Planning du personnel
                </button>
                
        </div>
    </div>
);

}
export default Gestiondesressourceshumaines;