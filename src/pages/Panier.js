import {useState, useEffect, } from "react";
import "./panier.css";
import { useSelector } from "react-redux";
import { selectBaskets } from "../app/Redux-slices/basketsSlice";
import Empty from "../images/Sans_titre-58.png";
import Product from "../components/product/Products";
import RadioButtonsGroup from "../components/RadioPanier";
import { splitPrix, calculTotal, getNombresArticles } from "../utilities";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Procedure from './procedure';


const Panier = () => {
  const history = useHistory();
  const baskets = useSelector(selectBaskets);
  console.log(baskets);
  const idProcedure = 1;

  const [reduction, setReduction] = useState(0); /// Use for the promotional code
  const [reductionMessage, setReductionMesssage] = useState(false) // Display promotional message of a valid code is applied
  const [reductionPrixTotal, setReductionPrixTotal] = useState((reduction > 0) ? (calculTotal(baskets) - (calculTotal(baskets)*reduction/100)).toFixed(2) : 0);

  function handleCallback(percent_off){ // Retrieve data from the child, for the reduction
    setReduction(percent_off)
    if(percent_off > 0){
      setReductionMesssage(true)
      setReductionPrixTotal((calculTotal(baskets) - (calculTotal(baskets)*reduction/100)).toFixed(2))//Ici pour changer le prix du père (paiement)
    }
  }

  useEffect(() => {
    // Caculate the price reduction which take a %
    setReductionPrixTotal((reduction > 0) ? (calculTotal(baskets) - (calculTotal(baskets)*reduction/100)).toFixed(2) : 0) 
  })

  return (
    <div className="panier">
      {!baskets.length ? (
        <div className="panier__vide">
          <h1>Votre panier est vide</h1>
          <button onClick={history.goBack} className="go-back">
            <ArrowBackIcon className="arrowIcon" />
            Retour
          </button>
          <img src={Empty} alt="empty basket" />
        </div>
      ) : (
        <div className="panier__container">
         {/* <Procedure idProc={idProcedure}/> */} 
          <h1 className="panier__container_titre">Détail du panier</h1>
          <p style={{textAlign:"center"}}>
            <button onClick={history.goBack} className="go-back">
              <ArrowBackIcon />
              Retour
            </button>
          </p>
          <p className="panier__nombre-articles">
            {getNombresArticles(baskets)} article
            {getNombresArticles(baskets) > 1 && "s"}
          </p>
          {baskets.map((product) => {
            return (
              <>
                <Product key={product.nom} {...product} />
              </>
            );
          })}

          <div className="panier__container--prix">
            {/*============= Print the reduction =============*/}
            <div className="reducMsg">
            {(reduction > 0) ? ("Une réduction de : " + reduction + "% a été appliquée") : ("")}
            </div>
            {/*============= End print the reduction =============*/}
            <p>
              Prix Total{" "}
              <span style={{ fontSize: "1rem", color: "black" }}>(TTC)</span>
            </p>
            <p>{calculTotal(baskets)} €</p>
          </div>
          {/*============= START : Print the total price after reduction =============*/}
          <div className="panier__container--prix"  style={{ marginLeft: "48%", paddingLeft: "2%", color: "white", backgroundColor: "black"}}>
              {reductionMessage ? (
                <p>Prix après réduction :  {reductionPrixTotal} €</p>
                ) : ("")
              }
          </div >
          {/*============= END : Print the total price after reduction =============*/}

          <RadioButtonsGroup parentCallback = {handleCallback} reductionPrixTotal = {reductionPrixTotal}/>
        </div>
      )}
    </div>
  );
};

export default Panier;
