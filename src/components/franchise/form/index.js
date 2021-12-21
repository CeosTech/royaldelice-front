import React, { useState } from "react";
// import emailjs from "emailjs-com";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import star from "../../../images/star.svg";
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/esm/Button';

import "./form.css";
import useForm from "../../../hooks/useForm";

import { sendrequest } from "../../../middlewares/request"

// import { db, timestamp } from "../../config/firebase";
import ModalBootsrap from "../../modal/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1.8, 0),
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

const initial = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  situation: "",
  echeance:"",
  ville: "",
  apport: "",
  message: "",
};

const ContactForm = () => {
  const classes = useStyles();
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

    if ("situation" in fieldValues)
      validator.situation = state.situation ? null : "Le champ situation est obligatore";

    if ("echeance" in fieldValues)
      validator.echeance = state.echeance ? null : "Le champ échéance est obligatore";

    if ("ville" in fieldValues)
      validator.ville = state.ville ? null : "Le champ ville est obligatore";

    if ("apport" in fieldValues)
      validator.apport = state.apport ? null : "Le champ apport est obligatore";


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
      validator.numTel = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(
        telephone
      )
        ? null
        : "Le numéro de téléphone n'est pas valide";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const {
    state,
    handleInputChange,
    errors,
    setErrors,
    reinitialiserState,
  } = useForm(initial, estValide);

  const { nom, prenom, email, telephone, situation, echeance, ville, apport, message } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    sendrequest("post", "restaurant/contact/", null, null, state)
    .then ((response) => {      
      if (response !==false && estValide()){
        setSuccess(true);
        handleShow();
      }
      else {
        setSuccess(false);
        handleShow();
      }     
    })

    
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

  return (
    <div className='form__container'>

            <div className="formulaireTitleContainer" >
                <Typography gutterBottom variant="h5" component="h1" className="formulaireTitle" >
                    <img src={star} /> Demande D'informations <img src={star} />
                </Typography>
            </div>
    <div className="contact-coord" >
      <h2>REMPLISSEZ NOTRE FORMULAIRE</h2>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <Grid container justifyContent='center' direction="row">
          <Grid container xs={10} md={7}>
          
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Nom *</InputLabel>
              <Input value={nom} name='nom' onChange={handleInputChange} required />
            </FormControl>
            <div className='error'>{errors.nom}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Prénom *</InputLabel>
              <Input
                value={prenom}
                name='prenom'
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className='error'>{errors.prenom}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>E-mail *</InputLabel>
              <Input
                type='email'
                name='email'
                onChange={handleInputChange}
                value={email}
                required
              />
            </FormControl>
            <div className='error'>{errors.email}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Téléphone</InputLabel>
              <Input
                value={telephone}
                name='telephone'
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className='error'>{errors.telephone}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Situation professionnelle *</InputLabel>
              <Input value={situation} name='situation' onChange={handleInputChange} required />
            </FormControl>
            <div className='error'>{errors.situation}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Échéance du projet *</InputLabel>
              <Input value={echeance} name='echeance' onChange={handleInputChange} required />
            </FormControl>
            <div className='error'>{errors.echeance}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>La ville souhaitée *</InputLabel>
              <Input value={ville} name='ville' onChange={handleInputChange} required />
            </FormControl>
            <div className='error'>{errors.ville}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Apport personnel  *</InputLabel>
              <Input value={apport} name='apport' onChange={handleInputChange} required />
            </FormControl>
            <div className='error'>{errors.apport}</div>
         

          </Grid>

          <Grid container xs={10} md={7}>
              <TextField
                fullWidth
                className={`${classes.margin} ${classes.border} `}
                id='outlined-multiline-static'
                label='Laissez-nous un message'
                multiline
                rows={20}
                name='message'
                value={message}
                onChange={handleInputChange}
                variant='outlined'
              />
              <div className='error'>{errors.message}</div>
          </Grid>
        

      </Grid>
      <Box textAlign="center">
        <Button
          type='submit'
          id="Btn_Envoyer_Franchise"
          className='submit'
          endIcon={<SendIcon />}>
          Envoyer
        </Button>
      </Box>

        <ModalBootsrap
          handleClose={handleClose}
          show={show}
          title={
            <>
            {success ? "Envoyé" : "Oups"}
              <i
                className={
                  `${success ? " fas fa-thumbs-up" : " fas fa-thumbs-down"}`}
                style={{ color: "#4caf50", marginLeft: "1rem" }}></i>
            </>
          }>
          {success ? "Votre message a bien été envoyé , vous allez très rapidement contacté." : "Une erreur s'est produite, veuillez réessayer."}
        </ModalBootsrap>
      </form>
    </div>
  </div>
  );
};

export default ContactForm;
