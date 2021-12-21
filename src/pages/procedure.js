import './procedure.css';


const Procedure = (props) => {
    const idProcedure = props.idProc;

    return (
        <div className="procedure-panier">
            <p>
            {idProcedure == 1 
                ? (<p className="procedure-in"> 1 </p>)
                : (<p className="procedure-out"> 1 </p>)
            }
                <div className="procedure-text">Panier</div>
            </p>
            <div className="procedure-icon"></div>
            <p>
            {idProcedure == 2 
                ? (<p className="procedure-in"> 2 </p>)
                : (<p className="procedure-out"> 2 </p>)
            }
                <div className="procedure-text">Adresse de facturation</div>
            </p>
            <div className="procedure-icon"></div>
            <p>
            {idProcedure == 3
                ? (<p className="procedure-in"> 3 </p>)
                : (<p className="procedure-out"> 3 </p>)
            }
                <div className="procedure-text">Détails de paiement</div>
            </p>
            </div>
    );
};
export default Procedure;