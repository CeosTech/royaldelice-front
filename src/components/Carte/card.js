import { useState, useEffect } from "react";
import "./card.css";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addProduct } from "../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../app/Redux-slices/alertsSlice";
//import CardAfficheNombreViande from "./CardAfficheNombreViande";

import { Button, IconButton, TextField } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { splitPrix } from "../../utilities";

import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

var compteurSupplement = 0; // pour les supplements
var compteurUnique = 0; // pas utilisé
var compteurDouble = 0; // pour les sauces
var compteurViandes = 0; // pour les viandes
var compteurTriple = 0; // pour les garnitures
var prix_total = 0;
var tabGarniture = [];
var tabSauce = [];
var tabViande_2 = [];
var tabViande_3 = [];
var tabSupplement = [];

let nomCategorie = "Menu Sandwich"; // à modifier selon la catégorie

const Card = ({
  data,
  nom,
  prix,
  id,
  description,
  ingredients,
  categorie,
  disponibilite,
  image,
  sur_grill,
  est_menu_sandwichs,
  boisson,
  sideDishes,
  setSideDishes,
  boissonFamily,
  setBoissonFamily,
  choixPain,
  setChoixPain,
  choixSupplementViande,
  setChoixSupplementViande,
  choixSupplementViande_2,
  setChoixSupplementViande_2,
  choixGarniture,
  setChoixGarniture,
  choixSauce,
  setChoixSauce,
  choixSupplement,
  setChoixSupplement,
  choixSupplementSucree,
  setChoixSupplementSucree,
  choixSupplementFruits,
  choixSupplementSal,
  choixSupplementFrites,
  choixTaille,
  setChoixTaille,
  choixSupplementPizza,
  setChoixSupplementPizza,
  choixViande,
  setChoixViande,
}) => {
  const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const [showButton, setShowButton] = useState(false);

  const [error, setError] = useState(false);
  const [errorSupplement, setErrorSupplement] = useState(false);
  const [errorUnique, setErrorUnique] = useState(false);
  const [errorDouble, setErrorDouble] = useState(false);
  const [errorViandes_2, setErrorViandes_2] = useState(false);
  const [errorViandes_3, setErrorViandes_3] = useState(false);
  const [errorTriple, setErrorTriple] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(null);
  const [sideDish, setSideDish] = useState(null); //boisson
  const [boissonFam, setBoissonFam] = useState(null); //boisson
  const [TailleSelected, setTailleSelected] = useState(null);
  const [prixTailleSelected, setPrixTailleSelected] = useState(0);
  const [boissonSelected, setBoissonSelected] = useState(null);
  const [painSelected, setPainSelected] = useState(null);
  const [viande_1_Selected, setViande_1_Selected] = useState(null);
  const [viande_2_Selected, setViande_2_Selected] = useState([]);
  const [viande_3_Selected, setViande_3_Selected] = useState([]);
  const [listViandes, setListViandes] = useState([]);
  const [garnitureSelected, setGarnitureSelected] = useState(null);
  const [sauceSelected, setSauceSelected] = useState(null);
  const [supplementSelected, setSupplementSelected] = useState(null);
  const [prixTotal, setPrixTotal] = useState(prix);
  const [comment, setComment] = useState("");

  const extractViandes = (choixViandes) => {
    let viandes = [];
    choixViandes.forEach((viande) => {
      viandes.push(viande.nom);
    });
    setListViandes(viandes);
  };

  //pour l'affichage des viandes 1 et 2 si ils existent selon le produit
  useEffect(() => {
    extractViandes(choixSupplementViande);
  }, []);

  // useEffect(() => {
  //   console.log("liste des viandes", listViandes);
  // }, [listViandes]);

  const handleClose = (e) => {
    if (
      e.target.classList.contains("myModal__backdrop") ||
      e.target.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.parentNode.classList.contains(
        "myModal__modal__close-btn"
      )
    ) {
      setShow(false);
      setShowButton(false);

      compteurSupplement = 0;
      compteurUnique = 0;
      compteurDouble = 0;
      compteurViandes = 0;
      compteurTriple = 0;
      prix_total = 0;
      tabGarniture = [];
      tabViande_2 = [];
      tabViande_3 = [];
      tabSupplement = [];

      setBoissonSelected(null);
      setPainSelected(null);
      setGarnitureSelected(null);
      setSauceSelected(null);
      setSupplementSelected(null);
      setViande_1_Selected(null);
      setViande_2_Selected(null);
      setViande_3_Selected(null);

      setPrixTotal(prix);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  let prix_supplement = 0;

  const info_supplement = (val) => {
    let tabSupp = { nom_supplement: val.nom, prix_supplement: val.prix };
    let inf_supp = JSON.stringify(tabSupp);
    return inf_supp;
  };

  //prix_total = prix;

  const handleChangeSupplement = (event) => {
    //console.log(prixTotal)

    let testCompteur = event.target.checked;
    let prixSupp = JSON.parse(event.target.value);

    if (testCompteur === true) {
      compteurSupplement += 1;
      setPrixTotal(prixTotal + prixSupp.prix_supplement);
      tabSupplement.push(event.target.value);
      console.log(tabSupplement);

      if (compteurSupplement >= 9) {
        setErrorSupplement(true);
        //setLimitation(true)
      } else {
        setErrorSupplement(false);
        //setLimitation(false)
      }
    } else {
      compteurSupplement -= 1;
      setPrixTotal(prixTotal - prixSupp.prix_supplement);

      for (let i in tabSupplement) {
        if (tabSupplement[i] === event.target.value) {
          tabSupplement.splice(i, 1);
          console.log(tabSupplement);
        }
      }

      if (compteurSupplement >= 9) {
        setErrorSupplement(true);
        //setLimitation(true)
      } else {
        setErrorSupplement(false);
        //setLimitation(false)
      }
    }
  };

  const handleChangeSauce = (event) => {
    // sauce
    let testCompteur = event.target.checked;
    if (testCompteur === true) {
      compteurDouble += 1;
      tabSauce.push(event.target.value);
      console.log(tabSauce);

      if (compteurDouble >= 3) {
        setErrorDouble(true);
        //setLimitation(true)
      } else {
        setErrorDouble(false);
        //setLimitation(false)
      }
    } else {
      compteurDouble -= 1;
      for (let i in tabSauce) {
        if (tabSauce[i] === event.target.value) {
          tabSauce.splice(i, 1);
          console.log(tabSauce);
        }
      }

      if (compteurDouble >= 3) {
        setErrorDouble(true);
        //setLimitation(true)
      } else {
        setErrorDouble(false);
        //setLimitation(false)
      }
    }
  };

  const handleChangeGarniture = (event) => {
    // Cas où on sélectionne une garniture
    let testCompteur = event.target.checked;
    if (testCompteur === true) {
      // incrémentation du compteur de sélection
      compteurTriple += 1;
      //enregistrement de la garniture sélectionnée dans un tableau
      tabGarniture.push(event.target.value);
      // Affichage du tableau
      console.log(tabGarniture);

      // Vérification de la limite de sélection
      if (compteurTriple >= 4) {
        setErrorTriple(true);
      } else {
        setErrorTriple(false);
      }
    } else {
      // Cas où on désélectionne une garniture
      // décrémentation du compteur de sélection
      compteurTriple -= 1;
      // suppression de la garniture désélectionnée dans le tableau
      for (let i in tabGarniture) {
        if (tabGarniture[i] === event.target.value) {
          tabGarniture.splice(i, 1);
          // Affichage du tableau
          console.log(tabGarniture);
        }
      }

      // Vérification de la limite de sélection
      if (compteurTriple >= 4) {
        setErrorTriple(true);
      } else {
        setErrorTriple(false);
      }
    }
  };

  const handleChangePain = (event) => {
    setPainSelected(event.target.value);
    setError(false);
  };

  const handleChangeViande_1 = (event) => {
    setViande_1_Selected(event.target.value);
    setError(false);
  };

  const handleChangeViande_2 = (event) => {
    let testCompteur = event.target.checked;
    if (testCompteur === true) {
      compteurViandes += 1;
      tabViande_2.push(event.target.value);
      console.log(tabViande_2);

      if (compteurViandes >= 3) {
        setErrorViandes_2(true);
      } else {
        setErrorViandes_2(false);
      }
    } else {
      compteurViandes -= 1;
      for (let i in tabViande_2) {
        if (tabViande_2[i] === event.target.value) {
          tabViande_2.splice(i, 1);
          console.log(tabViande_2);
        }
      }

      if (compteurViandes >= 3) {
        setErrorViandes_2(true);
      } else {
        setErrorViandes_2(false);
      }
    }
  };

  const handleChangeViande_3 = (event) => {
    let testCompteur = event.target.checked;
    if (testCompteur === true) {
      compteurViandes += 1;
      tabViande_3.push(event.target.value);
      console.log(tabViande_3);

      if (compteurViandes >= 4) {
        setErrorViandes_3(true);
      } else {
        setErrorViandes_3(false);
      }
    } else {
      compteurViandes -= 1;
      for (let i in tabViande_3) {
        if (tabViande_3[i] === event.target.value) {
          tabViande_3.splice(i, 1);
          console.log(tabViande_3);
        }
      }

      if (compteurViandes >= 4) {
        setErrorViandes_3(true);
      } else {
        setErrorViandes_3(false);
      }
    }
  };

  const handleChangeBoisson = (event) => {
    setBoissonSelected(event.target.value);
    setError(false);
  };

  const handleSubmit = (test) => {
    // console.log("test");
    // console.log(test);
    dispath(
      addProduct({
        nom,
        image,
        prix: prixTailleSelected,
        id,
        quantite,
        categorie,
        //sideDish: sideDish.nom,
        prixTotal: parseFloat(prixTotal.toFixed(2)),
        nomCategorie: nomCategorie,
        boissonSelected: boissonSelected,
        garnitureSelected: tabGarniture,
        painSelected: painSelected,
        viande_1_selected: viande_1_Selected,
        viande_2_selected: tabViande_2, //à vérifier
        viande_3_selected: tabViande_3, //à vérifier
        sauceSelected: tabSauce,
        supplementSelected: tabSupplement,
        information: comment,
      })
    );
    dispath(addAlert({ nom, image, id: uuidv4() }));
    setQuantite(1);
    setError(false);
    setShow(false);
    setValue(null);
  };

  /* If the item is available, we can click to add it to the basket */
  const orderIfAvailable = () => {
    setShow(true);
  };

  const verifySeletedDishes = () => {
    console.log(data);
/* MENUS SANDWICH */
    if (data.categorie === 1 && data.id !== 11 ) {
      console.log("BREAKPOINT 1")
      if (
        boissonSelected !== null &&
        painSelected !== null &&
        sauceSelected !== null &&
        errorSupplement !== true &&
        errorDouble !== true &&
        errorTriple !== true
      ) {
        setError(false);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurUnique = 0;
        compteurDouble = 0;
        compteurViandes = 0;
        compteurTriple = 0;
        tabGarniture = [];
        tabSauce = [];
        tabSupplement = [];

        setBoissonSelected(null);
        setPainSelected(null);
        setGarnitureSelected(null);
        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
/*================= VERIFICATION MENUS AU FOUR */
    } else if (data.categorie == 2) {
      console.log("BREAKPOINT 2")
      if (
        boissonSelected !== null &&
        sauceSelected !== null &&
        errorSupplement !== true &&
        errorDouble !== true &&
        errorTriple !== true
      ) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurUnique = 0;
        compteurDouble = 0;
        compteurViandes = 0;
        compteurTriple = 0;
        tabGarniture = [];
        tabSauce = [];
        tabSupplement = [];

        setBoissonSelected(null);
        setPainSelected(null);
        setGarnitureSelected(null);
        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        console.log("ICI ERREUR 1")
        setErrorSubmit(true);
      }
    } else if (
      data.categorie == 9 ||
      data.categorie == 11 ||
      data.categorie == 10
    ) {
      console.log("BREAKPOINT 3")
      if ( errorSupplement !== true) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        tabSupplement = [];

        setTailleSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    } else if (data.categorie == 6) {
      console.log("BREAKPOINT 4")
      if (
        boissonSelected !== null &&
        sauceSelected !== null &&
        errorSupplement !== true &&
        errorDouble !== true
      ) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurDouble = 0;
        tabSauce = [];
        tabSupplement = [];

        setBoissonSelected(null);
        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    } else if (data.categorie == 14 || data.categorie == 8 || data.categorie == 4 || data.categorie == 15 ) {
      if (
        sauceSelected !== null &&
        errorSupplement !== true &&
        errorDouble !== true
      ) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurDouble = 0;
        tabSauce = [];
        tabSupplement = [];

        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    } else if (data.categorie == 13) {
      if (
        sauceSelected !== null &&
        errorSupplement !== true &&
        errorDouble !== true &&
        errorTriple !== true
      ) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurDouble = 0;
        compteurTriple = 0;
        tabGarniture = [];
        tabSauce = [];
        tabSupplement = [];

        setGarnitureSelected(null);
        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    /* BURGER */
    } else if (data.categorie == 12) {
        if (
          sauceSelected !== null &&
          errorSupplement !== true &&
          errorDouble !== true &&
          errorTriple !== true
        ) {
          setError(false);
          console.log(error);
          handleSubmit(true);

          compteurSupplement = 0;
          compteurDouble = 0;
          compteurTriple = 0;
          tabGarniture = [];
          tabSauce = [];
          tabSupplement = [];

      setGarnitureSelected(null);
      setSauceSelected(null);
      setSupplementSelected(null);
      setPrixTotal(prix);
    } else {
      //Rajouter les erreurs pour chaque cas
      setErrorSubmit(true);
    }
    }else if (data.categorie == 7) {
      if (
        boissonSelected !== null &&
        sauceSelected !== null &&
        errorSupplement !== true 
      ) {
        setError(false);
        console.log(error);
        handleSubmit(true);
        compteurSupplement = 0;
        tabSupplement = [];
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    } else if (
      data.categorie == 18 ||
      data.categorie == 17 ||
      data.categorie == 16 ||
      data.categorie == 15
    ) {
      if (errorSupplement !== true) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        tabSupplement = [];

        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
      
    } else if (data.categorie === 5 && data.id === 85) {
      console.log("BREAKPOINT 1")
      if (
        viande_1_Selected !== null ||
        (viande_2_Selected !== null && tabViande_2.length === 2) ||
        (viande_3_Selected !== null && tabViande_3.length === 3)
      ) {
        if (
          boissonSelected !== null &&
          //garnitureSelected !== null &&
          sauceSelected !== null &&
          errorSupplement !== true &&
          errorDouble !== true &&
          errorTriple !== true &&
          errorViandes_2 !== true &&
          errorViandes_3 !== true
        ) {
          setError(false);
          console.log(error);
          handleSubmit(true);

          compteurSupplement = 0;
          compteurDouble = 0;
          compteurViandes = 0;
          compteurTriple = 0;
          prix_total = 0;
          //tabGarniture = [];
          tabSauce = [];
          tabViande_2 = [];
          tabViande_3 = [];
          tabSupplement = [];

          setBoissonSelected(null);
          //setGarnitureSelected(null);
          setSauceSelected(null);
          setSupplementSelected(null);
          setViande_1_Selected(null);
          setViande_2_Selected(null);
          setViande_3_Selected(null);
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else {
        setErrorSubmit(true);
      }
    } else if ((data.categorie === 5 || data.categorie == 1) && (data.id === 98 || data.id === 11)) {
      if (
        viande_2_Selected !== null && tabViande_2.length === 2
      ) {
        if (
          boissonSelected !== null &&
          //garnitureSelected !== null &&
          sauceSelected !== null &&
          errorSupplement !== true &&
          errorDouble !== true &&
          errorTriple !== true &&
          errorViandes_2 !== true &&
          errorViandes_3 !== true
        ) {
          setError(false);
          console.log(error);
          handleSubmit(true);

          compteurSupplement = 0;
          compteurDouble = 0;
          compteurViandes = 0;
          compteurTriple = 0;
          prix_total = 0;
          //tabGarniture = [];
          tabSauce = [];
          tabViande_2 = [];
          tabViande_3 = [];
          tabSupplement = [];

          setBoissonSelected(null);
          //setGarnitureSelected(null);
          setSauceSelected(null);
          setSupplementSelected(null);
          setViande_1_Selected(null);
          setViande_2_Selected(null);
          setViande_3_Selected(null);
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else {
        setErrorSubmit(true);
      }
    } else if (data.categorie === 5 && data.id === 99) {
      if (
        (viande_3_Selected !== null && tabViande_3.length === 3)
      ) {
        if (
          boissonSelected !== null &&
          //garnitureSelected !== null &&
          sauceSelected !== null &&
          errorSupplement !== true &&
          errorDouble !== true &&
          errorTriple !== true &&
          errorViandes_2 !== true &&
          errorViandes_3 !== true
        ) {
          setError(false);
          console.log(error);
          handleSubmit(true);

          compteurSupplement = 0;
          compteurDouble = 0;
          compteurViandes = 0;
          compteurTriple = 0;
          prix_total = 0;
          //tabGarniture = [];
          tabSauce = [];
          tabViande_2 = [];
          tabViande_3 = [];
          tabSupplement = [];

          setBoissonSelected(null);
          //setGarnitureSelected(null);
          setSauceSelected(null);
          setSupplementSelected(null);
          setViande_1_Selected(null);
          setViande_2_Selected(null);
          setViande_3_Selected(null);
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else {
        setErrorSubmit(true);
      }
/* MENUS BURGER & Menu Panini et Croque MR */
    } else if (data.categorie == 3 || data.categorie == 24) {
      /* MENUS BURGER et MENUS BURGER MAISON */
      if (
        boissonSelected !== null &&
        sauceSelected !== null &&
        errorSupplement !== true &&
        errorDouble !== true &&
        errorTriple !== true
      ) {
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurDouble = 0;
        compteurTriple = 0;
        tabGarniture = [];
        tabSauce = [];
        tabSupplement = [];

        setBoissonSelected(null);
        setGarnitureSelected(null);
        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    } else if (data.categorie === 19 || data.categorie === 20) {
      /* DESSERT & BOISSON */
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurDouble = 0;
        compteurTriple = 0;
        tabGarniture = [];
        tabSauce = [];
        tabSupplement = [];

        setBoissonSelected(null);
        setGarnitureSelected(null);
        setSauceSelected(null);
        setSupplementSelected(null);
        setPrixTotal(prix);
    }
  };

  let freePizza = () => {
    return (
      <>
        <TextField
          id="outlined-full-width"
          placeholder="Choix de la 2ème pizza offerte"
          helperText="Offre valable sur les pizzas Senior UNIQUEMENT VENTE À EMPORTER"
          fullWidth
          margin="right"
          rows={2}
          variant="outlined"
          onChange={handleCommentChange}
        />
      </>
    );
  };

  const printSupplement = (data) => {
    if (
      data.categorie == 12 ||
      data.categorie == 16    
      ) {
      return choixSupplementSal;
    } else if (
      data.categorie == 9 ||
      data.categorie == 11 ||
      data.categorie == 10
    ) {
      return choixSupplementPizza;
    } else if (data.categorie == 18) {
      return choixSupplementSucree;
    } else if (data.categorie == 17) {
      return choixSupplementFruits;
    } else if (data.categorie == 15) {
      return choixSupplementFrites;
    } else {
      return choixSupplement;
    }
  };

  // const Prix = splitPrix(prix);

  return (
    // Depending on the availability or not of the item, the css style will vary, thanks to a different className
    <div className="card__command__container">
      <div
        className={"card__item " + (!disponibilite ? "item_unavailable" : "")}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        onClick={() => orderIfAvailable()}
      >
        <div className="card_contain">
          <h1 className="card__item__heading">{nom}</h1>
          <div className="card__item__image-container">
            <img src={image} alt={nom} />
          </div>
          <div className="card__item__details">
          {data.categorie == 9 || data.categorie == 10 || data.categorie == 11 ? (
                <p>{splitPrix(prix)}</p>
            ) : <p>{splitPrix(prix)}</p> }
          </div>
        </div>
      </div>
      <div>
        <Modal
          showModal={show}
          setShowModal={setShow}
          handleClose={handleClose}
        >
          <Modal.Header>
            <h1>{nom}</h1>
            <img src={image} alt={nom} />

            {data.categorie == 9 || data.categorie == 10 || data.categorie == 11 ? (
                <p> à partir de {splitPrix(choixTaille[0].prix)}</p>
            ) : <p>{splitPrix(prix)}</p> }

          </Modal.Header>
          <Modal.Body>
            <Modal.Body.Heading>Description</Modal.Body.Heading>
            <p>{description}</p>
          </Modal.Body>

          {/*------------------------- Choix Pain ------------------------------------------*/}
          {data.categorie == 1 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Pain au choix
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <RadioGroup
                  name="pain_sandwich"
                  value={painSelected}
                  onChange={handleChangePain}
                >
                  {choixPain.map((data) => {
                    return (
                      <div className="sides-radioGroup" key={data.id}>
                        <FormControlLabel
                          value={data.nom}
                          control={<Radio />}
                          id={data.id}
                          className="radio-choice__menu"
                          onClick={() => {
                            setError(false);
                            setPainSelected(data);
                          }}
                        />
                        <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                      </div>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}
              {errorUnique && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 1 élément maximum
                </p>
              )}
              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Taille Pizza ------------------------------------------*/}
          {data.categorie == 100 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Taille Pizza
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <RadioGroup>
                  {choixTaille.map((data) => {
                    if (1 === 1)
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={data.nom}
                            control={
                              <Radio
                                onChange={(e) => {
                                  setTailleSelected(e.target.value);
                                  setPrixTailleSelected(data.prix);
                                  setPrixTotal(data.prix);
                                }}
                              />
                            }
                            id={data.id}
                            className="radio-choice__menu"
                          />
                          {TailleSelected === data.nom &&
                          TailleSelected !== "Solo" ? (
                            <>
                              <div className="zones__container">
                                <FormControlLabel
                                  className="radio__panier-zone"
                                  control={<FormControl />}
                                  label={freePizza()}
                                />
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <Modal.Body.Heading>
                            {data.nom + " (" + data.prix.toFixed(2) + "€)"}
                          </Modal.Body.Heading>
                        </div>
                      );
                    else return null;
                  })}
                </RadioGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Viande x1 ------------------------------------------*/}
          {data.categorie === 5 && data.id === 85 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Viande
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <RadioGroup
                  name="viande"
                  value={viande_1_Selected}
                  onChange={handleChangeViande_1}
                >
                  {choixViande.map((data) => {
                    if (1 === 1)
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={data.nom}
                            control={<Radio />}
                            id={data.id}
                            className="radio-choice__menu"
                            onClick={() => {
                              setError(false);
                              setViande_1_Selected(data);
                            }}
                          />
                          <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                        </div>
                      );
                    else return null;
                  })}
                </RadioGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}
              {errorUnique && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 1 élément maximum
                </p>
              )}
              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Viande x2 ------------------------------------------*/}

          {(data.categorie === 5 || data.categorie === 1 ) && (data.id === 98 || data.id ===11) ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Choix des 2 viandes
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {choixViande.map((data) => {
                    if (1 === 1)
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={data.nom}
                            control={
                              <Checkbox onChange={handleChangeViande_2} />
                            }
                            id={data.id}
                            className="radio-choice__menu"
                            onClick={() => {
                              //setError(false);
                              setViande_2_Selected(data);
                            }}
                          />
                          <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                        </div>
                      );
                    else return null;
                  })}
                </FormGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}
              {errorViandes_2 && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 2 éléments maximum
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Viande x3 ------------------------------------------*/}

          {(data.categorie === 5 && data.id === 99) ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Choix des 3 viandes
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {choixViande.map((data) => {
                    if (1 === 1)
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={data.nom}
                            control={
                              <Checkbox onChange={handleChangeViande_3} />
                            }
                            id={data.id}
                            className="radio-choice__menu"
                            onClick={() => {
                              //setError(false);
                              setViande_3_Selected(data);
                            }}
                          />
                          <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                        </div>
                      );
                    else return null;
                  })}
                </FormGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}
              {errorViandes_3 && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 3 éléments maximum
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Garniture ------------------------------------------*/}
          {data.categorie == 1 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Garniture
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {choixGarniture.map((data) => {
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={data.nom}
                            control={
                              <Checkbox onChange={handleChangeGarniture} />
                            }
                            id={data.id}
                            className="radio-choice__menu"
                            onClick={() => {
                              //setError(false);
                              setGarnitureSelected(data);
                            }}
                          />
                          <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                        </div>
                      );
                  })
                  }
                </FormGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}
              {errorTriple && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 3 éléments maximum
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}
          {/*------------------------- Choix Sauce ------------------------------------------*/}
          {data.categorie == 1 ||
          data.categorie == 2 ||
          data.categorie == 3 ||
          data.categorie == 12 ||
          data.categorie == 5 ||
          data.categorie == 6 ||
          data.categorie == 7 ||
          data.categorie == 13 ||
          data.categorie == 8 ||
          data.categorie == 15 ||
          data.categorie == 4 ||
          data.categorie == 14 ||
          data.categorie == 24? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                {[5,2,13,1,15].includes(data.categorie) ? "Sauce(s)" : "Sauce(s) pour les frites"}
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {choixSauce.map((data) => {
                    if (1 === 1)
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={data.nom}
                            control={<Checkbox onChange={handleChangeSauce} />}
                            id={data.id}
                            className="radio-choice__menu"
                            onClick={() => {
                              //setError(false);
                              setSauceSelected(data);
                            }}
                          />
                          <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                        </div>
                      );
                    else return null;
                  })}
                </FormGroup>
              </FormControl>
              {error && (
                <p className="error">
                  Veuillez sélectionner au moins un élément
                </p>
              )}
              {errorDouble && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 2 éléments maximum
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}
          {/*------------------------- Choix Supplement ------------------------------------------*/}
          {data.categorie == 1 ||
          data.categorie == 2 ||
          data.categorie == 3 ||
          data.categorie == 5 ||
          data.nom.includes("Panini") ||
          data.categorie == 13 ||
          data.categorie == 12 ||
          data.categorie == 16 ||
          data.categorie == 9 ||
          data.categorie == 10 ||
          data.categorie == 11 ||
          data.categorie == 18 ||
          data.categorie == 17||
          data.categorie == 24  ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Supplément(s)
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {data.categorie === 5 ?
                  printSupplement(data).map((data) => {
                    if (data.id !== 17 && data.id !== 18){
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={info_supplement(data)}
                            control={
                              <Checkbox onChange={handleChangeSupplement} />
                            }
                            id={data.id}
                            className="radio-choice__menu"
                          />
                          <Modal.Body.Heading>
                            {data.nom} <span className="span_card">({data.prix.toFixed(2)}€)</span>
                          </Modal.Body.Heading>
                        </div>
                        );
                      }else {
                        return null;
                      }
                  }) : 
                  printSupplement(data).map((data) => {
                      return (
                        <div className="sides-radioGroup" key={data.id}>
                          <FormControlLabel
                            value={info_supplement(data)}
                            control={
                              <Checkbox onChange={handleChangeSupplement} />
                            }
                            id={data.id}
                            className="radio-choice__menu"
                          />
                          <Modal.Body.Heading>
                            {data.nom} <span className="span_card">({data.prix.toFixed(2)}€)</span>
                          </Modal.Body.Heading>
                        </div>
                        );
                  }) }
                </FormGroup>
              </FormControl>
              {errorSupplement && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 8 suppléments maximum
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Boisson ------------------------------------------*/}

          <Modal.Body>
            {data.categorie == 1 ||
            data.categorie == 2 ||
            data.categorie == 3 ||
            data.categorie == 4 ||
            data.categorie == 5 ||
            data.categorie == 6 ||
            data.categorie == 24 ? (
              <>
                <Modal.Body.Heading style={{ marginBottom: "1.5rem" }}>
                  Boisson
                </Modal.Body.Heading>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="boisson"
                    value={boissonSelected}
                    onChange={handleChangeBoisson}
                  >
                    {sideDishes.map((sideDish) => {
                      if (sideDish.disponibilite)
                        return (
                          <div className="sides-radioGroup" key={sideDish.id}>
                            <FormControlLabel
                              value={sideDish.nom}
                              control={<Radio />}
                              id={sideDish.id}
                              className="radio-choice__menu"
                              onClick={() => {
                                //setError(false);
                                setBoissonSelected(sideDish);
                              }}
                            />
                            <Modal.Body.Heading>
                              {sideDish.nom}
                            </Modal.Body.Heading>
                          </div>
                        );
                      else return null;
                    })}
                  </RadioGroup>
                </FormControl>
                {error && (
                  <p className="error">
                    Veuillez sélectionner au moins un élément
                  </p>
                )}
                {errorUnique && (
                  <p className="error">
                    Veuillez sélectionner jusqu'à 1 élément maximum
                  </p>
                )}
              </>
            ) : null}

            {data.categorie == 7 ? (
                <>
                <Modal.Body.Heading style={{ marginBottom: "1.5rem" }}>
                  Boisson
                </Modal.Body.Heading>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="boisson"
                    value={boissonSelected}
                    onChange={handleChangeBoisson}
                  >
                    {boissonFamily.map((boissonFam) => {
                      if (boissonFam.disponibilite)
                        return (
                          <div className="sides-radioGroup" key={boissonFam.id}>
                            <FormControlLabel
                              value={boissonFam.nom}
                              control={<Radio />}
                              id={boissonFam.id}
                              className="radio-choice__menu"
                              onClick={() => {
                                //setError(false);

                                setBoissonSelected(boissonFam);

                              }}
                            />
                            <Modal.Body.Heading>
                              {boissonFam.nom}
                            </Modal.Body.Heading>
                          </div>
                        );
                      else return null;
                    })}
                  </RadioGroup>
                </FormControl>
                {error && (
                  <p className="error">
                    Veuillez sélectionner au moins un élément
                  </p>
                )}
                {errorUnique && (
                  <p className="error">
                    Veuillez sélectionner jusqu'à 1 élément maximum
                  </p>
                )}
              </>
            ) : null}

             <TextField
            id="outlined-full-width"
            style={{ marginBottom: "2rem" }}
            placeholder="Informations importantes"
            helperText="Indiquez ici toute information importante"
            fullWidth
            margin="normal"y
            rows={2}
            variant="outlined"
            onChange={handleCommentChange}
          /> 

          </Modal.Body>

          <Modal.Footer className="card__item__total__price">
            <Modal.Body.Heading>
              Prix Total
              <span className="span_card" style={{ fontSize: "1rem", color: "black" }}>(TTC)</span>
            </Modal.Body.Heading>
            <p style={{ fontSize: "1.3rem" }}>
              {(quantite * prixTotal).toFixed(2)}€
            </p>
          </Modal.Footer>
          <Modal.Footer>
            <div
              style={{
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                style={{ margin: "0 5px" }}
                onClick={() => {
                  if (quantite > 0) {
                    setQuantite(quantite - 1);
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>

              <span className="span_card">{quantite}</span>

              <IconButton
                style={{ margin: "0 5px" }}
                onClick={() => setQuantite(quantite + 1)}
              >
                <AddIcon />
              </IconButton>
            </div>

            {/* If the item is non available, this will be displayed */}
            {!disponibilite && <p>Produit non disponible</p>}

            {disponibilite && (
              <Button
                disabled={quantite === 0}
                onClick={() => {
                  verifySeletedDishes();
                }}
                variant="contained"
                color="secondary"
                className="card__item__commander-btn"
                endIcon={<AddShoppingCartIcon style={{ fontSize: "25px" }} />}
              >
                Ajouter au panier
              </Button>
            )}
          </Modal.Footer>
          {errorSubmit && (
            <p className="error" style={{ textAlign: "center" }}>
              Veuillez remplir correctement l'ensemble des champs obligatoires
            </p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Card;
