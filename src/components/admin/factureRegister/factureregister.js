import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import { sendrequest } from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import { TextField } from "@material-ui/core";
import { React } from "react-dom";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import {URL} from "../../../middlewares/request";
import { Alert } from "react-alert";


import "./factureRegister.css";

const initial = {
  montantHT: "",
  montantTVA: "",
  fournisseur: "",
  date_achat: "",
  photo_facture: null,
};

function FactureRegister(props) {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const estValide = (fieldValues = state) => {
    const validator = {};

    if ("montantHT" in fieldValues)
      validator.montantHT = state.montantHT
        ? null
        : "Le champ montant est obligatore";

    if ("montantTVA" in fieldValues)
      validator.montantTVA = state.montantTVA ? null : "Le champ TVA est obligatore";

    if ("fournisseur" in fieldValues)
      validator.fournisseur = state.fournisseur
        ? null
        : "Le champ fournisseur est obligatore";

    if ("date" in fieldValues)
      validator.date_achat = state.date_achat ? null : "Le champ date n'est pas validé";

    //   if ("date" in fieldValues)
    //   validator.date = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(
    //     code_postal
    //   )
    //     ? null
    //     : "La code date n'est pas valide";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const { state, setState, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, estValide);

  const { montantHT, montantTVA, fournisseur, date_achat, photo_facture } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('state:', state)
    if (estValide()){
    //   sendrequest("post", "comptabilite/facture/", null, null, state).then(response => {
    //     setSuccess(true); 
    //     handleShow();
    //   reinitialiserState();
    // }).catch(error => {
    //   setSuccess(false);
    //   handleShow();
    //});
    

    // On utilise FormData pour envoyer un fichier vers l'api, car avec sendresquest cela ne fonctionne pas vu que ça envoie un
    let form_data = new FormData();
    form_data.append('photo_facture', state.photo_facture, state.photo_facture.name);
    form_data.append('montantHT', state.montantHT);
    form_data.append('montantTVA', state.montantTVA);
    form_data.append('fournisseur', state.fournisseur);
    form_data.append('date_achat', state.date_achat);
    let url = URL+"comptabilite/facture/";

    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          setSuccess(true); 
          handleShow();
         reinitialiserState();
        })
        .catch(err => {
          setSuccess(false);
          handleShow();
        })
  };

    
  };

  const history = useHistory();

  const RedirectionInfo = () => {
    let url = "/admin/Comptabilite/";
    history.push(url);
  };
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
    setState({...state,photo_facture:fileUploaded})
    if (fileUploaded){
      alert("Vous avez inséré une image !")
    }
  };

  const [aujourdhui_ca, setAujourdhuiCa] = useState(null);
  const [calendar, setCalendar] = useState(new Date().toLocaleDateString());
  const [calendar_ca, setCalendarCa] = useState(null);

  const aujourdhui = new Date().getTime(); //// 11/03/2021

  //const dateFormat= "jj/mm/aaaa"

  const get_suivi_jour = async (val) => {
    setState({...state, date_achat:val})
  };


  const get_ca_by_calendar = (e) => {
    // console.log(e.target.valueAsNumber);
    // console.log(e.target.valueAsDate);
    // console.log(new Date(e.target.valueAsNumber).toDateString()); //// Tue Mar 09 2021

    setCalendar(new Date(e.target.valueAsNumber).getTime());
    let tmp = new Date(e.target.valueAsNumber).getTime()
    //const { debut, fin } = get_time_debut_fin(new Date(e.target.valueAsNumber));
    get_suivi_jour(tmp);
  };

  const handleTVAChange=(event)=>{
    setState({...state,montantTVA:event.target.value})
  }

  // useEffect(() => {
  //   console.log('state:', state)
   
  // }, [state])

  return (
    
    <div className="facture">
      <div className="facture-header">
        <i className="fas fa-arrow-left" onClick={RedirectionInfo}></i>
        <h1>Enregistrer une facture</h1>
      </div>

      <div className="facture_center" >
      <form className=" facture_container" onSubmit={handleSubmit}>
        <div className="adresse_facture">
          <div className="facture_div">
            <TextField
              className="facture_input"
              fullWidth
              label="Montant HT en euros"
              id="outlined-basic"
              variant="outlined"
              name="montantHT"
              value={montantHT}
              onChange={handleInputChange}
              required
            />
            <div className="errors">{errors.montantHT}</div>
          </div>

          <div className="facture_div">
            <FormControl variant="outlined" className="facture_tva">
              <InputLabel id="demo-simple-select-outlined-label">
                TVA
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={montantTVA}
                onChange={handleTVAChange}
                label="Age"
              >
                <MenuItem value="" disabled>Chosir TVA</MenuItem>
                <MenuItem value={5.5}>5.5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
            <div className="errors">{errors.montantTVA}</div>
          </div>
        </div>

        <div className="facture_div">
          <TextField
            className="facture_input"
            fullWidth
            label="Fournisseur"
            id="outlined-basic"
            variant="outlined"
            name="fournisseur"
            value={fournisseur}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.fournisseur}</div>
        </div>

        <div className="facture_div">
          {/* <TextField
            className="facture_input"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            name="date_achat"
            type="date"
            value={date_achat}
            onChange={handleInputChange}
            required
          /> */}
          <TextField type='date' onChange={get_ca_by_calendar} 
          className="facture_input"
          fullWidth
          id="outlined-basic"
          variant="outlined"
          name="date_achat"
          required/>
          <div className="errors">{errors.date_achat}</div>
        </div>

        <div className="telecharger_div">
          <Button fullWidth onClick={handleClick}>
            Téléverser facture
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <div className="errors">{errors.photo_facture}</div>
        </div>

        <div className="caisse_button">
          <button className="registre_facture_button" type="submit">
            Valider
          </button>
        </div>

        <ModalBootsrap
          handleClose={handleClose}
          show={show}
          title={
            <>
              {success ? "Envoyé" : "Oups"}
              <i
                className={`${
                  success ? " fas fa-thumbs-up" : " fas fa-thumbs-down"
                }`}
                style={{ color: "#4caf50", marginLeft: "1rem" }}
              ></i>
            </>
          }
        >
          {success
            ? "Enregistrement avec succès."
            : "Une erreur s'est produite, veuillez réessayer."}
        </ModalBootsrap>
      </form>
      </div>
    </div>
    
  );
}
export default FactureRegister;
