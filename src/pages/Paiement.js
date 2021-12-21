import { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  Select,
  MenuItem,
  // Modal,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useForm from "../hooks/useForm";

import "./paiement.css";

import { sendrequest } from "../middlewares/request";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { selectBaskets, emptyBasket } from "../app/Redux-slices/basketsSlice";
import spinner from "../images/spinner.gif";
import { calculPrixProduitAvecQuantite, calculTotal } from "../utilities";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "../components/MyModal/Modal";
import { URL } from "../middlewares/request";
import Procedure from "./procedure";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
  marginLeftRight: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },

  buttonIcon: {
    paddingLeft: 1,
  },

  border: {
    "& label.Mui-focused": {
      color: "#ccc",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ccc",
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ccc",
      },
    },
  },
}));

// variable arbitraire pour effectuer des tests
const initial = {
  nom: "",
  prenom: "",
  email: "",
  num_tel: "",
  adresse: "",
  ville: "",
  code_postale: "",
  montant: 0,
};

const Paiement = (props) => {
  // With location we can retrieve the kind of delivery chosen (was passed in props of history)
  const location = useLocation();

  const [paiment_process, setPaiement_process] = useState("livraison");
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  // const [supplements, setSupplements] = useState([]);
  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const dispatch = useDispatch();
  const baskets = useSelector(selectBaskets);
  console.log(`baskets`, baskets);

  const classes = useStyles();

  const typeOfDelivery =
    location.delivery !== undefined
      ? location.delivery.value
      : "veuillez choisir un mode de livraison dans le panier";

  const estValide = (fieldValues = state) => {
    const validator = {};
    if ("nom" in fieldValues)
      validator.nom = state.nom ? null : "le champ nom est obligatore";
    if ("prenom" in fieldValues)
      validator.prenom = state.prenom ? null : "le champ prenom est obligatore";

    if ("email" in fieldValues)
      validator.email = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(email)
        ? null
        : "Email n'est pas valide";

    if ("num_tel" in fieldValues)
      validator.num_tel =
        /(?:(\+(\d{1,2})?)[ -]?)?\(?(?<first>\d{3})\)?[-\s]?(\d{3})[- ]?(\d{4})/.test(
          num_tel
        )
          ? null
          : "Numéro de téléphone n'est pas valide";

    if ("adresse" in fieldValues)
      validator.adresse = state.adresse
        ? null
        : "le champ adresse est obligatore";
    if ("ville" in fieldValues)
      validator.ville = state.ville ? null : "le champ ville est obligatore";

    if ("code_postale" in fieldValues)
      validator.code_postale = /\d+/.test(code_postale)
        ? null
        : "Code postale n'est pas valide";

    if (location.delivery === undefined)
      validator.delivery =
        "Veuillez choisir un mode de livraison dans le panier";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, estValide);

  const { nom, prenom, email, num_tel, adresse, ville, code_postale } = state;

  const prixTotale = calculTotal(baskets);

  const montant = parseInt(prixTotale.toFixed(2), 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (estValide()) {
      setPaiement_process("paiement");
    }
  };

  const handleChange = (event) => {
    // Listen for changes in CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Fonction liée au paiement ainsi qu'à l'enregistrement des infos du clients
  const Payer = async (e) => {
    e.preventDefault();

    setProcessing(true);

    let montant = parseInt((prixTotale * 100).toFixed(2), 10)
    if(history.location.state.priceReduction !== null){ // Check if there is a price reduction
      montant = parseInt((history.location.state.priceReduction * 100).toFixed(2), 10)
    }
    if (history.location.state.frais > 0) {
      montant = montant + parseInt((history.location.state.frais * 100).toFixed(2), 10)
    }

    const { data } = await axios.post(URL + "paiement/create-client-secret", {
      amount: montant,
      email,
    });
    // *100 : stripe prend l'unité en centimes
    // 3€ -> 300 centimes

    const billing_details = {
      name: nom + " " + prenom,
      address: {
        city: ville,
        country: "fr",
        state: null,
        line1: adresse,
        line2: null,
        postal_code: code_postale,
      },
      email,
      phone: num_tel,
    };

    try {
      console.log("Test elements" + elements.getElement(CardElement));
      const payload = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details,
        },
      });
      if (payload.error) {
        setError(`Paiement échoué: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setDisabled(false);
        setSucceeded(true);

        const menus = [];
        const produits = [];

        baskets.forEach((item) => {
          const supp = JSON.stringify({
            pain: item.painSelected,
            sauce: item.sauceSelected,
            supplements: item.supplementSelected,
            garniture: item.garnitureSelected,
            boisson: item.boissonSelected,
            prixPizzaSelected: item.prix,
            viande_1_selected: item.viande_1_selected,
            viande_2_selected: item.viande_2_selected,
            viande_3_selected: item.viande_3_selected,
          });
          produits.push({
            produit_id: item.id,
            quantite: item.quantite,
            information: item.information,
            supplements: supp,
          });
        });

        const data = {
          client: {
            nom,
            prenom,
            email,
            telephone: num_tel,
            adresse,
            ville,
            code_postale,
            montant: parseFloat(history.location.state.priceReduction !== null ? history.location.state.priceReduction : prixTotale) + parseFloat(history.location.state.frais > 0 ? history.location.state.frais : 0),
          },
          panier: {
            menus: menus,
            infos_menus: JSON.stringify(menus),
            produits,
          },
          methode_vente: typeOfDelivery,
          commentaire: history.location.state.priceReduction === null ? location.delivery.comment : " || CODE PROMO : " + history.location.state.code_promo + '\n' + location.delivery.comment, // à voir
          prix_totale: parseFloat(history.location.state.priceReduction !== null ? history.location.state.priceReduction : prixTotale) + parseFloat(history.location.state.frais > 0 ? history.location.state.frais : 0),
        };

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        sendrequest("post", "paiement/create-commande", null, null, data) //commande partie resto
          .then((response) => {
            if (response !== false) {
              reinitialiserState();
              dispatch(emptyBasket());
              history.replace("/felicitation", { payer: true });
            } else {
              setError(
                "Un problème s'est produit lors du paiement, veuillez réessayer"
              );
            }
          });
      }
    } catch (err) {
      console.log(err);
      //setError(err.message);
    }
  };

  const handleClose = (e) => {
    if (
      e.target.classList.contains("myModal__backdrop") ||
      e.target.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.parentNode.classList.contains(
        "myModal__modal__close-btn"
      )
    ) {
      setShowModal(false);
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    console.log(`baskets de paiement à linterieru`, baskets);
    console.log(history.location.state)
  }, [baskets]);
   const idProcedure = 2;

  return (
    <div className="paiment">
      <div className="paiement__container">
        <h1>Paiement</h1>
        <div className="paiement__process">
          <div
            className={
              "paiement__process--option1 paiement__process--options active"
            }
          >
            <span>1</span>
            <p>Adresse de facturation</p>
          </div>
          <hr />
          <div
            className={
              "paiement__process--option2 paiement__process--options " +
              (paiment_process === "paiement" ? "active" : "")
            }
          >
            <span>2</span>
            <p>Détails de paiement</p>
          </div>
        </div>

        {paiment_process === "livraison" ? (
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ flexDirection: "column" }}
          >
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Nom</InputLabel>
              <Input
                value={nom}
                name="nom"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.nom}</div>
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Prenom</InputLabel>
              <Input
                value={prenom}
                name="prenom"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.prenom}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={email}
                required
              />
            </FormControl>
            <div className="error">{errors.email}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Numéro de Téléphone</InputLabel>
              <Input
                value={num_tel}
                name="num_tel"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.num_tel}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Adresse</InputLabel>
              <Input
                value={adresse}
                name="adresse"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.adresse}</div>

            <div style={{ display: "flex" }}>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}
              >
                <InputLabel>Ville</InputLabel>
                <Input
                  value={ville}
                  name="ville"
                  onChange={handleInputChange}
                  required
                />
                <div className="error">{errors.ville}</div>
              </FormControl>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}
              >
                <InputLabel>Code Postal</InputLabel>
                <Input
                  value={code_postale}
                  name="code_postale"
                  onChange={handleInputChange}
                  required
                />
                <div className="error">{errors.code_postale}</div>
              </FormControl>
            </div>

            {/* The type of delivery chosen */}
            <div className="delivery-infos__container">
              <p className="paiement__delivery-informations">
                Choix de livraison : {typeOfDelivery}
              </p>
              <div className="error">{errors.delivery}</div>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="paiement--btn"
              endIcon={<NavigateNextIcon />}
            >
              Suivant
            </Button>
          </form>
        ) : (
          <div className="paiement__details">
            <div className="paiement__details__recapitualitfs">
              <h2>Récapitulatif de commande</h2>
              {baskets.map((product) => (
                <div
                  className="paiement__details__product__details"
                  key={product.nom}
                >
                  <div className="paiement__details__product__details-info">
                    <p>{product.nom}</p>
                    <p className="paiement__details__product__details-info-quantite">
                      Quantité: <span> {product.quantite} </span>{" "}
                    </p>
                  </div>
                  <div className="paiement__details__product__details-prix">
                    <p>{calculPrixProduitAvecQuantite(product)}€</p>
                  </div>
                </div>
              ))}
              <div className="paiement__details__recapitualitfs-total">
                <p>TOTAL (TTC)</p>
                <p className="paiement__details__recapitualitfs-total-prix">
                  {prixTotale}€
                </p>
              </div>
              {/*================= START PRINT FRAIS LIVRAISON================================================*/}
              <div style={{ backgroundColor: "#f0c300", color: "white", fontFamily: "'Joti One', cursive", paddingLeft: "2%", marginTop: "1%" }}>
                {history.location.state.frais > 0 ? "Frais de livraison : " + history.location.state.frais + "€" : ""}
              </div>
              {/*================= END PRINT FRAIS LIVRAISON================================================*/}
              {/*================= START PRINT PRICE REDUCTION================================================*/}
              <div style={{backgroundColor: "black", color: "white", paddingLeft: "2%"}}>
                  {history.location.state.priceReduction !== null ? "Prix réduit : " + history.location.state.priceReduction +"€" : ""}
              </div>
              {/*================= END PRINT PRICE REDUCTION================================================*/}
            </div>

            <div className="paiement__details__modePaiement">
              <h2>Paiement sécurisé par carte bancaire</h2>
              <p>CB et VISA acceptées</p>
              <form className="paiement__form">
                <CardElement
                  id="card-element"
                  onChange={handleChange}
                  options={cardStyle}
                />
                {error && (
                  <div className="paiement__details__error">* {error}</div>
                )}


                <Button
                  onClick={Payer}
                  disabled={
                    prixTotale <= 1 || processing || disabled || succeeded
                  }
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="paiement--btn-payer"
                >
                  <span className="paiement--btn-payer-text">
                    {processing ? (
                      <img src={spinner} alt="spinner" />
                    ) : (
                      <>Payer {parseFloat(history.location.state.priceReduction !== null ? history.location.state.priceReduction : prixTotale) + parseFloat(history.location.state.frais > 0 ? history.location.state.frais : 0)}€</>
                    )}
                  </span>
                </Button>
              </form>
              <p className="paiement__details__securise">
                <i className="fas fa-lock"></i> Paiement 100% sécurisé
              </p>
            </div>
          </div>
        )}

        <div className="paiement__close">
          <IconButton onClick={handleOpen}>
            <i className="fas fa-times"></i>
          </IconButton>
        </div>
        <div
          className={
            "paiement__back " + (paiment_process === "paiement" ? "active" : "")
          }
        >
          <IconButton onClick={() => setPaiement_process("livraison")}>
            <i className="fas fa-arrow-left"></i>
          </IconButton>
        </div>

        <Modal
          closeButton={false}
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={handleClose}
        >
          <Modal.Header>
            <h2>
              Etes-vous sûr de vouloir quitter cette page et retourner à l'écran
              de commande ?
            </h2>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              className="myModal__modal__close-btn"
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "20px" }}
              className="myModal__modal__close-btn"
              onClick={(e) => {
                handleClose(e);
                history.replace("/commander");
              }}
            >
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aaa",
        backgroundColor: "#fff",
      },
      ":-webkit-autofill": {
        color: "#fff",
      },
      ":focus": {
        color: "#aaa",
      },
    },

    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

export default Paiement;
