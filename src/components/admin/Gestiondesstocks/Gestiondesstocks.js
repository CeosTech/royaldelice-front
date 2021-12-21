import { useHistory } from "react-router-dom";

import './Gestiondesstocks.css'
function Gestiondesstocks() {

  const history = useHistory();
  const faireRedirection = () =>{ 
    let url = "/admin/Gestion_des_stocks";
    history.push(url);
  }

 



  return (
    <div className="Container">

        <div className="Gestiondesstocks-header">
            <h1>Gestion des stocks</h1>
        </div>
        <div className='Gestiondesstocks'>

                <button className="button"onClick={faireRedirection}>
                    Nouvelle marchandise
                </button>
                <button className="button">
                   Produits en stock 
                </button>
                <button className="button">
                   Fiches techniques 
                </button>
                <button className="button">
                  Ratio clés
                </button>
                <button className="button">
                   Historique des factures
                </button>
                <button className="button">
                  Magasin
                </button>
               
               
                
        </div>
    </div>
);

}
export default Gestiondesstocks;


