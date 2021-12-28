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
var tabSupplement = [];

let nomCategorie = "Menu Sandwich"; // à modifier selon la catégorie

const Card = ({
  data,
  nom,
  prix,
  id,
  description,
  categorie,
  disponibilite,
  image,
  painByCategory,
  garnitureByCategory,
  supplementByCategory,
  sauceByCategory,
  viandeByCategory,
  boissonByCategory,
}) => {
  const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const [showButton, setShowButton] = useState(false);

  const [error, setError] = useState(false);
  const [errorUnique, setErrorUnique] = useState(false);
  const [errorDouble, setErrorDouble] = useState(false);
  const [errorTriple, setErrorTriple] = useState(false);
  const [errorViande, setErrorViande] = useState(false)
  const [errorSupplement, setErrorSupplement] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const [supplementSelected, setSupplementSelected] = useState(null);
  const [viande_1_Selected, setViande_1_Selected] = useState(null);
  const [viande_2_Selected, setViande_2_Selected] = useState([]);
  const [viande_3_Selected, setViande_3_Selected] = useState([]);
  const [painSelected, setPainSelected] = useState(null)

  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(null);
  const [boissonSelected, setBoissonSelected] = useState(null);
  const [prixTotal, setPrixTotal] = useState(prix);
  const [comment, setComment] = useState("");


  const handleClose = (e) => {
    console.log("close")
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

      tabGarniture = [];
      tabSauce = [];
      tabSupplement = [];

      setViande_1_Selected(null)
      setViande_2_Selected([])
      setViande_3_Selected([])
      setPainSelected(null)
      setBoissonSelected(null)

      compteurUnique = 0;
      compteurDouble = 0;
      compteurTriple = 0;
      prix_total = 0;

      setPrixTotal(prix);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  //prix_total = prix;


  const handleSubmit = (test) => {
    // console.log("test");
    // console.log(test);
    dispath(
      addProduct({
        nom,
        image,
        prix: 0,
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
        viande_2_selected: viande_2_Selected,
        viande_3_selected: viande_3_Selected,
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
    if (data.categorie === 24) { // BURGER
      if (
        /* painSelected !== null && */
        tabGarniture.length > 0 &&
        tabSauce.length > 0 &&
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

        /* setBoissonSelected(null);
        setPainSelected(null);
        setGarnitureSelected(null);
        setSauceSelected(null); */
        setSupplementSelected(null);
        setViande_1_Selected(null)
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    }
    else if (data.categorie === 25) { // TACOS
      if (data.id === 12 || data.id === 11) {
        if (
          /* painSelected !== null && */
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null);
          setViande_2_Selected([]);
          setViande_3_Selected([]);
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }

      } else if (data.id === 6) {
        if (
          /* painSelected !== null && */
          viande_1_Selected != null &&
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
          errorViande !== true &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null);
          setViande_2_Selected([]);
          setViande_3_Selected([]);
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else if (data.id === 7) {
        console.log("BREAKPOINT TACOS")
        if (
          /* painSelected !== null && */
          viande_2_Selected.length > 0 &&
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
          errorViande !== true &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null);
          setViande_2_Selected([]);
          setViande_3_Selected([]);
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else if (data.id === 10) {
        if (
          /* painSelected !== null && */
          viande_3_Selected.length > 0 &&
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
          errorViande !== true &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null)
          setViande_2_Selected([])
          setViande_3_Selected([])
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      }
    }
    else if (data.categorie === 23) { // SANDWICH
      if (
        /* painSelected !== null && */
        painSelected !== null &&
        tabGarniture.length > 0 &&
        tabSauce.length > 0 &&
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

        /* setBoissonSelected(null);
        setPainSelected(null);
        setGarnitureSelected(null);
        setSauceSelected(null); */
        setPainSelected(null)
        setSupplementSelected(null);
        setViande_1_Selected(null)
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    }
    else if (data.categorie === 27) { // ASSIETTE
      console.log("BREAKPOINT ASSIETTE")
      if (data.id === 48) {
        if (
          /* painSelected !== null && */
          viande_1_Selected != null &&
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
          errorViande !== true &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null)
          setViande_2_Selected([])
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else if (data.id === 49) {
        if (
          /* painSelected !== null && */
          viande_2_Selected.length > 0 &&
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
          errorViande !== true &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null)
          setViande_2_Selected([])
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      } else if (data.id === 51) {
        if (
          /* painSelected !== null && */
          viande_3_Selected.length > 0 &&
          tabGarniture.length > 0 &&
          tabSauce.length > 0 &&
          errorViande !== true &&
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

          setSupplementSelected(null);
          setViande_1_Selected(null)
          setViande_2_Selected([])
          setViande_3_Selected([])
          setPrixTotal(prix);
        } else {
          //Rajouter les erreurs pour chaque cas
          setErrorSubmit(true);
        }
      }
    }
    else if (data.categorie === 19 || data.categorie === 21) { // MENU BURGER + TEX MEX ->SAUCE&BOISSON
      if (
        boissonSelected !== null &&
        tabSauce.length > 0 &&
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

        setPainSelected(null);
        setBoissonSelected(null)
        setSupplementSelected(null);
        setViande_1_Selected(null);
        setViande_2_Selected([]);
        setViande_3_Selected([]);
        setPrixTotal(prix);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    }
    else if (data.categorie === 18 || data.categorie === 20) { // MENU SANDWICH + MENU PANINI & CROCS
      if (
        painSelected !== null &&
        boissonSelected !== null &&
        tabGarniture.length > 0 &&
        tabSauce.length > 0 &&
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

        setPainSelected(null);
        setBoissonSelected(null)
        setSupplementSelected(null);
        setViande_1_Selected(null);
        setViande_2_Selected([]);
        setViande_3_Selected([]);
        setPrixTotal(prix);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    }
    else if (data.categorie === 29 || data.categorie === 22 || data.categorie === 26) { // BARQUETTE DE FRITE + MENU ENFANT -> SAUCES
      if (
        tabSauce.length > 0 &&
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

        setPainSelected(null);
        setBoissonSelected(null)
        setSupplementSelected(null);
        setViande_1_Selected(null);
        setViande_2_Selected([]);
        setViande_3_Selected([]);
        setPrixTotal(prix);
        setPrixTotal(prix);
      } else {
        //Rajouter les erreurs pour chaque cas
        setErrorSubmit(true);
      }
    }
    else {
      handleSubmit(true);
    }

  };

  /* =================== SUPPLEMENT ================================ */

  const info_supplement = (val) => {
    let tabSupp = { nom_supplement: val.nom, prix_supplement: val.prix };
    let inf_supp = JSON.stringify(tabSupp);
    return inf_supp;
  };

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

  /* =================== GARNITURE ================================ */

  const handleChangeGarniture = (event) => {

    let testCompteur = event.target.checked;

    if (testCompteur === true) {
      compteurTriple += 1;
      tabGarniture.push(event.target.value);

      if (compteurTriple > 3) {
        setErrorTriple(true);
        //setLimitation(true)
      } else {
        setErrorTriple(false);
        //setLimitation(false)
      }
    } else {
      compteurTriple -= 1;
      if (compteurTriple <= 3) {
        setErrorViande(false);
        //setLimitation(true)
      }

      for (let i in tabGarniture) {
        if (tabGarniture[i] === event.target.value) {
          tabGarniture.splice(i, 1);
        }
      }
    }
  };

  /* =================== SAUCE ================================ */

  const handleChangeSauce = (event) => {
    let testCompteur = event.target.checked;

    if (testCompteur === true) {
      compteurDouble += 1;
      tabSauce.push(event.target.value);
      console.log(tabSauce)

      if (compteurDouble > 2) {
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
        }
        if (compteurDouble <= 2) {
          setErrorDouble(false);
          //setLimitation(true)
        }
      }
    }
  };

  /* =================== Viandex2 ================================ */

  const handleChangeViande2 = (event) => {
    let testCompteur = event.target.checked;
    let tmp = [...viande_2_Selected];

    if (testCompteur === true) {
      compteurViandes += 1;
      tmp.push(event.target.value);
      setViande_2_Selected(tmp)

      if (compteurViandes > 2) {
        setErrorViande(true);
        //setLimitation(true)
      } else {
        setErrorViande(false);
        //setLimitation(false)
      }
    } else {
      compteurViandes -= 1;

      for (let i in tmp) {
        if (tmp[i] === event.target.value) {
          tmp.splice(i, 1);
          setViande_2_Selected(tmp)
        }
        if (compteurViandes <= 2) {
          setErrorViande(false);
          //setLimitation(true)
        }
      }
    }
    console.log(viande_2_Selected)
  };

  /* =================== Viandex3 ================================ */

  const handleChangeViande3 = (event) => {
    let testCompteur = event.target.checked;
    let tmp = [...viande_3_Selected];

    if (testCompteur === true) {
      compteurViandes += 1;
      tmp.push(event.target.value);
      setViande_3_Selected(tmp)

      if (compteurViandes > 3) {
        setErrorViande(true);
        //setLimitation(true)
      } else {
        setErrorViande(false);
        //setLimitation(false)
      }
    } else {
      compteurViandes -= 1;

      for (let i in tmp) {
        if (tmp[i] === event.target.value) {
          tmp.splice(i, 1);
          setViande_3_Selected(tmp)
        }
        if (compteurViandes <= 3) {
          setErrorViande(false);
          //setLimitation(true)
        }
      }
    }
  };

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
            ) : <p>{splitPrix(prix)}</p>}
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

            <p>{splitPrix(prix)}</p>

          </Modal.Header>
          <Modal.Body>
            <Modal.Body.Heading>Description</Modal.Body.Heading>
            <p>{description}</p>
          </Modal.Body>

          {/*------------------------- Choix Pain ------------------------------------------*/}
          {painByCategory.length > 0 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Choix du Pain
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <RadioGroup
                  name="pain"
                  value={painSelected}
                >
                  {
                    painByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={<Radio />}
                              id={data.id}
                              className="radio-choice__menu"
                              onClick={() => {
                                console.log(data)
                                setError(false);
                                setPainSelected(data.nom);
                              }}
                            />
                            <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
                </RadioGroup>
              </FormControl>

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Garniture ------------------------------------------*/}
          {garnitureByCategory.length > 0 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Garniture(s)
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup value={tabGarniture}>
                  {
                    garnitureByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={
                                <Checkbox onChange={handleChangeGarniture} />
                              }
                              id={data.id}
                              className="radio-choice__menu"
                            />
                            <Modal.Body.Heading>
                              {data.nom}
                            </Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
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

          {/*------------------------- Choix Sauces ------------------------------------------*/}
          {sauceByCategory.length > 0 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Sauce(s)
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {
                    sauceByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={
                                <Checkbox onChange={handleChangeSauce} />
                              }
                              id={data.id}
                              className="radio-choice__menu"
                            />
                            <Modal.Body.Heading>
                              {data.nom}
                            </Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
                </FormGroup>
              </FormControl>

              <div className="separation_ligne"> </div>
            </>
          ) : null}
          {errorDouble && (
            <p className="error">
              Veuillez sélectionner jusqu'à 2 éléments maximum
            </p>
          )
          }

          {/*------------------------- Choix Viandex1 ------------------------------------------*/}
          {viandeByCategory.length > 0 && ([6, 48].includes(data.id)) ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Choix de la viande
              </Modal.Body.Heading>
              <FormControl component="fieldset">
              <RadioGroup
                  name="viande1"
                  value={viande_1_Selected}
                >
                  {
                    viandeByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={<Radio />}
                              id={data.id}
                              className="radio-choice__menu"
                              onClick={() => {
                                console.log(data)
                                setError(false);
                                setViande_1_Selected(data.nom);
                              }}
                            />
                            <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
                </RadioGroup>
              </FormControl>

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Viandex2 ------------------------------------------*/}
          {viandeByCategory.length > 0 && ([7, 49].includes(data.id)) ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Chois des 2 viandes
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {
                    viandeByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={
                                <Checkbox onChange={handleChangeViande2} />
                              }
                              id={data.id}
                              className="radio-choice__menu"
                            />
                            <Modal.Body.Heading>
                              {data.nom}
                            </Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
                </FormGroup>
              </FormControl>
              {errorViande && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 2 viandes.
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Viandex3 ------------------------------------------*/}
          {viandeByCategory.length > 0 && ([10, 51].includes(data.id)) ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Choix des 3 viandes
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {
                    viandeByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={
                                <Checkbox onChange={handleChangeViande3} />
                              }
                              id={data.id}
                              className="radio-choice__menu"
                            />
                            <Modal.Body.Heading>
                              {data.nom}
                            </Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
                </FormGroup>
              </FormControl>
              {errorViande && (
                <p className="error">
                  Veuillez sélectionner jusqu'à 3 viandes.
                </p>
              )}

              <div className="separation_ligne"> </div>
            </>
          ) : null}

          {/*------------------------- Choix Supplement ------------------------------------------*/}
          {data.supplement && supplementByCategory.length > 0 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Supplément(s)
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <FormGroup>
                  {
                    supplementByCategory.map((data) => {
                      if (data.disponibilite) {
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
                      }
                    })
                  }
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

          {/*------------------------- Boisson ------------------------------------------*/}
          {boissonByCategory.length > 0 ? (
            <>
              <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
              >
                Boisson
              </Modal.Body.Heading>
              <FormControl component="fieldset">
                <RadioGroup
                  name="boisson"
                  value={boissonSelected}
                >
                  {
                    boissonByCategory.map((data) => {
                      if (data.disponibilite) {
                        return (
                          <div className="sides-radioGroup" key={data.id}>
                            <FormControlLabel
                              value={data.nom}
                              control={<Radio />}
                              id={data.id}
                              className="radio-choice__menu"
                              onClick={() => {
                                //setError(false);
                                setBoissonSelected(data.nom)
                              }}
                            />
                            <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
                          </div>
                        );
                      }
                    })
                  }
                </RadioGroup>
              </FormControl>

              <div className="separation_ligne"> </div>
            </>
          ) : null}
          {errorDouble && (
            <p className="error">
              Veuillez sélectionner jusqu'à 2 éléments maximum
            </p>
          )
          }

          <TextField
            id="outlined-full-width"
            style={{ marginBottom: "2rem" }}
            placeholder="Informations importantes"
            helperText="Indiquez ici toute information importante"
            fullWidth
            margin="normal"
            rows={2}
            variant="outlined"
            onChange={handleCommentChange}
          />

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
    </div >
  );
};

export default Card;
