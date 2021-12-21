import React from 'react';
import "./Formulaire.css"
import useForm from "../../../hooks/useForm";
import { sendrequest } from "../../../middlewares/request";
import star from "../../../images/star.svg";
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import Button from 'react-bootstrap/esm/Button';
import { useState } from "react";
import ModalBootsrap from "../../modal/Modal";






const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '90%',
      },
    },

    form: {

        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        width: '95%',
    }
  }));

  const initial = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    situation: "",
    echeance:"",
    ville:"",
    apport:"",
    message: "",
    date: "",
  };

const Formulaire = () => {

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const estValide = (fieldValues = state) => {
      const validator = {};
      if ("nom" in fieldValues)
        validator.nom = state.nom ? null : "Le champ nom est obligatore";
  
      if ("prenom" in fieldValues)
        validator.prenom = state.prenom ? null : "Le champ prénom est obligatore";
  
      if ("date" in fieldValues) validator.date = state.date.getTime;
  
      if ("message" in fieldValues)
        validator.message =
          message.length > 10
            ? null
            : "le champ message doit avoir au moins 10 caractères";
  
      if ("email" in fieldValues)
        validator.email = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(email)
          ? null
          : "Le mail n'est pas valide";
  
      if ("telephone" in fieldValues)
        validator.numTel = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(telephone)
          ? null
          : "Le numéro de téléphone n'est pas valide";

      if ("situation" in fieldValues)
          validator.situation = state.situation ? null : "Le champ situation est obligatore";

      if ("echeance" in fieldValues)
        validator.echeance = state.echeance ? null : "Le champ echeance est obligatore";

      if ("ville" in fieldValues)
        validator.ville = state.ville ? null : "Le champ ville est obligatore";

      if ("apport" in fieldValues)
        validator.apport = state.apport ? null : "Le champ apport est obligatore";
  
      setErrors({ ...validator });
  
      // retourne boolean si et seulement si on passe un parametre pour la fonction
      if (fieldValues === state) {
        return Object.values(validator).every((el) => !el);
      }
    };
  
    const { state, handleInputChange, errors, setErrors, reinitialiserState } =
      useForm(initial, estValide);
  
    const { nom, prenom, email, telephone, situation, echeance, ville, apport, message, date } = state;
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      sendrequest("post", "mustang/contact/", null, null, state).then(
        (response) => {
          if (response !== false && estValide()) {
            setSuccess(true);
            handleShow();
          } else {
            setSuccess(false);
            handleShow();
          }
        }
      );
  
      reinitialiserState();
  
      if (estValide()) {
        // db.collection("contact").add({
        //   ...state,
        //   createdAt: timestamp(),
        // });
        // // Envoyer email
        // emailjs
        //   .sendForm(
        //     "service_6127e6c",
        //     "template_xlbstkg",
        //     e.target,
        //     "user_kgB4die8lZG1EnOhBisaS"
        //   )
        //   .then(
        //     (result) => {
        //       console.log(result.text);
        //     },
        //     (error) => {
        //       console.log(error.text);
        //     }
        //   );
        // TODO: utiliser /restaurant/contact pour enregistrer
      }
    };

   
    const classes = useStyles();

    return (
        <div className='formulaire' id='contact'>
            <div className="formulaireTitleContainer" >
                <Typography gutterBottom variant="h5" component="h1" className="formulaireTitle" >
                    <img src={star} /> Demande D'informations <img src={star} />
                </Typography>
            </div>

            <div className="contact-coord" >
                        <h2>REMPLISSEZ NOTRE FORMULAIRE</h2>
                        <form>
                        <Grid container direction="row" alignItems="center" justifyContent="center" className='container_formulaire_info'>
                            <Grid container xs={10} md={5} alignItems="center" justifyContent="center">
                                <form className={classes.root} noValidate autoComplete="off" id="Grid_formulaire" onSubmit={handleSubmit}>
                                    <TextField id="filled-basic" 
                                        label="Nom" required
                     
                                        variant="filled" />
                                    
                                    <TextField id="filled-basic" 
                                        label="E-mail*"
                              
                                        variant="filled" />
                                    
                                    <TextField id="filled-basic" 
                                        label="Situation professionnelle" required
                                 
                                        variant="filled" />
                                    
                                    <TextField id="filled-basic" 
                                        label="La ville souhaitée" required
                                        variant="filled" />     
                                </form>
                            </Grid>
                            <Grid container xs={10} md={5} alignItems="center" justifyContent="center">
                                <form className={classes.root} noValidate autoComplete="off" id="Grid_formulaire">
                                    
                                    <TextField id="filled-basic" 
                                        label="Prénom" required
                          
                                        variant="filled" />
                                    
                                    <TextField id="filled-basic" 
                                        label="Téléphone"
                
                                        variant="filled" />
                                    
                                    <TextField id="filled-basic" 
                                        label="Échéance du projet" required
                   
                                        variant="filled" />
                                    
                                    <TextField id="filled-basic" 
                                        label="Apport personnel " required
                      
                                        variant="filled" /> 
                                </form> 
                            </Grid>
                            <Grid container xs={9} md={10} alignItems="center" justifyContent="center">
                                <form className={classes.form}  noValidate autoComplete="off">
                                    <TextField fullWidth multiline 
                                    rows={15} id="filled-basic" 
                       
                                    label="Message" 
                                    variant="filled" />
                                </form>    
                            </Grid>   
                            
                            
                            <Grid container xs={12} md={12} justifyContent="center" alignItems="center">
                                <Button id="Btn_Envoyer_Franchise"  onClick={handleInputChange}><strong> ENVOYER</strong></Button>
                            </Grid>
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
                                ? "Votre message a bien été envoyé , vous allez très rapidement contacté."
                                : "Une erreur s'est produite, veuillez réessayer."}
                            </ModalBootsrap>
                        </Grid>

                        
                        
                        </form>
            </div>
        </div>
    );
};

export default Formulaire;