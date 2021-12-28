import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Input, InputLabel, Grid,} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { sendrequest } from "../../middlewares/request";
import { useSelector } from "react-redux";
import { calculTotal, getNombresArticles } from "../../utilities";
import { selectBaskets } from "../../app/Redux-slices/basketsSlice";

import spinner from "../../images/spinner.gif";
import "./styles.css";

import CGV from "../../Documents/CGV_MUSTANG_BONDY.pdf";
import axios from "axios";
import { URL } from "../../middlewares/request";

const RadioButtonsGroup = (props) => {
  const history = useHistory();
  const baskets = useSelector(selectBaskets);

  const [value, setValue] = React.useState("");
  const [zoneValue, setZoneValue] = React.useState("");
  const [livraison, setLivraison] = React.useState(false);
  const [comment, setComment] = useState("");

  /* Promotional code */
  const [promo_code, setPromo] = useState("");// For promo_code input
  const [codeError, setPromoError] = useState({check: null, msg: ""}) // Error for promo code
  const [reduction, setReduction] = useState(0) // Reduction for the oder ( only % )
  const [reductionPrixTotal, setReductionPrixTotal] = useState(props.reductionPrixTotal); 
  const [processing, setProcessing] = useState(false);

  /* START ZONE DE LIVRAISON */
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  const [min1, setMin1] = useState(20)
  const [min2, setMin2] = useState(30)
  const [min3, setMin3] = useState(40)

  const [frais1, setFrais1] = useState(0) // Frais zone 1
  const [frais2, setFrais2] = useState(0) // Frais zone 2
  const [frais3, setFrais3] = useState(0) // Frais zone 3
  const [frais, setFrais] = useState(0)

  /* END ZONE DE LIVRAISON */

  const [error, setError] = React.useState(false);
  const [isOpened, setOpening] = useState([]); // undefined
  const [errorCGV, setErrorCGV] = useState(false);

  const [checked, setChecked] = useState(false);

  const fetchData = async () => {
    console.log("je lance")
    const res = await axios.get(URL + "restaurant/zone-livraison");
    setList(res.data)

    setMin1(list[0]?.montant)
    setMin2(list[1]?.montant)
    setMin3(list[2]?.montant)

    setFrais1(list[0]?.frais)
    setFrais2(list[1]?.frais)
    setFrais3(list[2]?.frais)

    setLoad(true)
  };

  const handleChange = (event) => {
    if (event.target.value === "livraison") {
      setLivraison(true);
    } else {
      setLivraison(false);
    }
    setValue(event.target.value);
    setError(false);
  };

  const handleChangeZone = (event) => {
    console.log("La valeur est : " +  zoneValue)
    switch (event.target.name) {
      case "zone 1":
        setFrais(frais1);
        break;
      case "zone 2":
        setFrais(frais2);
        break;
      case "zone 3":
        setFrais(frais3);
        break;
    }
    setZoneValue(event.target.value);
    setError(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const get_restaurant = async () => {
    sendrequest("get", "restaurant/info_restaurant/", setOpening);
  };

  const affichageZone1 = () => {
    return (
      <>
        <p className="radio__text-zone">
          <strong>{list[0]?.nom + " (" + list[0].montant + "€ minimum de commande " + (frais1 > 0 ? " + " +frais1 + "€ de frais de livraison " : ")") } : <br /> </strong>
          {list[0].description}
        </p>
      </>
    );
  };

  const valZone1 = min1;

  const affichageZone2 = () => {
    return (
      <p className="radio__text-zone">
        <strong>{list[1]?.nom + " (" + list[1].montant + "€ minimum de commande" + (frais2 > 0 ? " + " +frais2 + "€ de frais de livraison )" : " )")} : <br /> </strong>
        {list[1].description}
      </p>
    );
  };

  const valZone2 = min2;

  const affichageZone3 = () => {
    return (
      <p className="radio__text-zone">
        <strong>{list[2]?.nom + " (" + list[2].montant + "€ minimum de commande " + (frais3 > 0 ? " + " +frais2 + "€ de frais de livraison )" : " )")} : <br /> </strong>
        {list[2].description}
      </p>
    );
  };

  const valZone3 = min3;

  useState(() => get_restaurant());

  // Will redirect to the payment and add in the props the kind of delivery chosen
  const handleSubmit = () => {
    const d = new Date();
    const hour = d.getHours();
    const day = d.getDay();
    const isMenu = baskets.filter((menu) => "type" in menu);
    console.log("go");
    //If the restaurant is closed
    if (!isOpened[isOpened.length - 1].disponibilite_restaurant) {
      alert(
        "Nous sommes désolés, le restaurant est actuellement fermé, revenez bientôt !"
      );
    } else if (day > 5 && isMenu.length > 0) {
      //If the user is trying to order a menu at the wrong time : order possible monday to friday
      alert(
        "Nous sommes désolés, il n'est pas possible de commander un menu le week-end."
      );
    } else if ((hour < 11 || hour > 13) && isMenu.length > 0) {
      //If the user is trying to order a menu at the wrong time : order possible 11h to 14h
      alert(
        "Nous sommes désolés, il n'est possible de commander un menu qu'entre 11h et 14h."
      );
    } else {
      //Validate the cart
      if (value !== "" && checked) {
        let priceReduction = null
        if(reduction > 0){
          priceReduction = reductionPrixTotal
        }
        history.push({
          pathname: "/paiement",
          delivery: { value, comment, },
          state: {priceReduction: priceReduction, code_promo: promo_code, frais: frais },
        });
        setError(false);
        setErrorCGV(false);
      } else {
        if (value == "") {
          setError(true);
        }
        if (!checked) {
          setErrorCGV(true);
        }
      }
    }
  };

  const total = calculTotal(baskets);

  const zoneVerify = (event) => {
    if (Number(zoneValue) === valZone1 && total < valZone1) {
      alert(
        "Le minimum de commande pour cette zone est de" +
          valZone1 +
          "€. Veuillez compléter votre panier, merci :)"
      );
      setZoneValue(-1);
    } else if (Number(zoneValue) === valZone2 && total < valZone2) {
      alert(
        "Le minimum de commande pour cette zone est de " +
          valZone2 +
          "€. Veuillez compléter votre panier, merci :)"
      );
      setZoneValue(-1);
    } else if (Number(zoneValue) === valZone3 && total < valZone3) {
      alert(
        "Le minimum de commande pour cette zone est de " +
          valZone3 +
          "€. Veuillez compléter votre panier, merci :)"
      );
      setZoneValue(-1);
    } else {
      handleSubmit();
    }
  };

  /******************************
            Promotion part
  *******************************/
  // Handle value changes in the promotional code input
  const handlePromotion = (e) => {
    setPromo(e.target.value)
    console.log(e.target.value)
  };

  // Using the API to check the the code provided by the user
  const redeemCode = async (e) => {
    e.preventDefault();
    let res = null // stock the result from the request 
    res = await axios.get(URL + "promo-code/get/"+promo_code).then(response => response.data);
    if (promo_code !== null && promo_code !== "") {
      setProcessing(true)
      if(res.check){ // if the code is valid
        setReduction(res.percent_off)// stock the percent of reduction
        props.parentCallback(res.percent_off);
        setPromoError({check: true, msg: "Le code est valide : " + promo_code}) // Display message for valid code
        setReductionPrixTotal((calculTotal(baskets) - (calculTotal(baskets)*res.percent_off/100)).toFixed(2))// stock the price reduction
      }else{
        setPromoError({check: false, msg: "Le code est invalide"})// Display message for invalid code
      }
      setProcessing(false)
    }
  }

  useEffect(() => {
    setReductionPrixTotal(props.reductionPrixTotal)
    console.log(reduction + "," + reductionPrixTotal)
  })

  useEffect(() => {
    fetchData();
  }, [load]);

  return (
    <div className="panier__fieldset">
      <TextField
        id="outlined-full-width"
        style={{ marginBottom: "2rem", color: "#C3232B" }}
        placeholder="Commentaire"
        helperText="Indiquez ici toute information complémentaire sur votre commande"
        fullWidth
        margin="normal"
        rows={2}
        variant="outlined"
        onChange={handleCommentChange}
      />

      {/*=============== PROMOTION CODE ===================================*/}
      <div id="promo">
        <div class="stylePromo">
            <InputLabel>Code promotionnel</InputLabel>
            <Input 
              value={promo_code}
              name="promo_code"
              onChange={handlePromotion}
              style={{ color: "black", width: "25ch", borderColor: "red"}}
            />
            <div className="error" style={{
              color: codeError.check ? 'green' : 'red'
            }}>{codeError.msg}</div>
        </div>
                  <Button
                    onClick={redeemCode}
                    disabled={
                      promo_code === "" || promo_code === null
                    }
                    type="submit"
                    className="promo--btn"
                  >
                    <span className="promo--btn-text">
                      {processing ? (
                        <img src={spinner} alt="spinner" />
                        ) : (
                          <h4>Appliquer mon code</h4>
                        )}
                    </span>
                  </Button>
      </div>
      {/*=============== END PROMOTION CODE ===================================*/}

      <div className='div_emporter'>
        <RadioGroup
              aria-label="panier__choice-delivery"
              name="panier__choice-delivery"
              value={value}
              onChange={handleChange}
                >
              <Grid container justifyContent="center" xs={12}>
                  <Grid md={12} justifyContent='center'>
                      <h1 className="text_mode_livraison">Mode de Livraison</h1>
                  </Grid>
                  <Grid container md={4} xs={12} justifyContent='center' alignItems='center'>
                    <FormControlLabel
                      className="radio__panier-choice"
                      value="à emporter"
                      id="radio_emporter"
                      control={<Radio />}
                      label="À emporter"
                    />
               
                  </Grid>
                  <Grid container md={4} xs={12} justifyContent='center' alignItems='center'>
                    {isOpened[0] !== undefined && isOpened[0].disponibilite_livraison ? (
                      <FormControlLabel
                        value="livraison"
                        className="radio__panier-choice"
                        control={<Radio />}
                        label="Livraison"
                      />
                      ) : null}
                  </Grid>
                  
              </Grid>
            </RadioGroup>
          </div>
      
        
        
        
      

      {error && (
        <p className="error error_cart">
          Veuillez choisir un mode de livraison
        </p>
      )}

      {livraison ? (
        <>
          <div className="livraison__container">
            <h1>
              Minimum de commande selon la zone
              <br />
              Délai livraison : 30 mins / 1 heure
            </h1>
            <p>Veuillez choisir votre zone de livraison</p>
          </div>

          <div className="zones__container">
            <RadioGroup
              aria-label="panier__choice-delivery"
              name="panier__choice-delivery"
              value={zoneValue}
              onChange={handleChangeZone}
            >
               <FormControlLabel
                value={min1.toString()}
                className="radio__panier-zone"
                name="zone 1"
                control={<Radio />}
                label={affichageZone1()}
              />
              <FormControlLabel
                value={min2.toString()}
                className="radio__panier-zone"
                name="zone 2"
                control={<Radio />}
                label={affichageZone2()}
              />
              <FormControlLabel
                value={min3.toString()}
                className="radio__panier-zone"
                name="zone 3"
                control={<Radio />}
                label={affichageZone3()}
              />
            </RadioGroup>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="CGV__container">
        <Checkbox
          checked={checked}
          onClick={() => {
            setChecked(!checked);
            setErrorCGV(false);
          }}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <p>
          J'ai lu et j'accepte les{" "}
          <a href={CGV} target="_blank">
            Conditions Générales de Vente
          </a>
        </p>
      </div>

      {errorCGV && (
        <p className="error error_cart">
          Veuillez accepter les conditions générales de vente
        </p>
      )}

      <Button
        onClick={zoneVerify}
        type="submit"
        variant="contained"
        color="secondary"
        className="panier__container--btn-valider"
        id='btn_commander_panier'
      >
        Commander
      </Button>
    </div>
  );
};

export default RadioButtonsGroup;
