import React, {useHistory} from "react-router-dom";
import  { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
 import {sendrequest} from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import {TextField} from '@material-ui/core';
import axios from "axios";
import {URL} from "../../../middlewares/request";

import './dirigeant.css'


const UpdateFormDirigeant = ({restaurantOwner}) => {

    const history = useHistory();

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dirigeant, setDirigeant] = useState([]);
    const [initState, setInitState] = useState([]);
    const [infoRestaurant, setInfoRestaurant] = useState([]);
    const [infoEntreprise, setInfoEntreprise] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const token = window.$token_access;
    const email = window.$email_dirigeant;
    const password_dir = window.$password_dirigeant;


    const updateData = async () => {
       const res = await axios.put(
                URL + "accounts/restaurantowner/" + restaurantOwner.id + "/"
            ,{
                nom: state.nom,
                prénom: state.prenom,
                email: state.adresse_mail,
                phone_number: state.num_tel,
                company_position: state.poste_occupe,
                restaurant: {
                    name: restaurantOwner.restaurant.name,
                    address: state.adresse,
                    postal_code: state.code_postal,
                    city: state.ville,
                    phone_number: restaurantOwner.restaurant.phone_number
                },
                company: {
                    name: restaurantOwner.company.name,
                    address: restaurantOwner.company.address,
                    postal_code: restaurantOwner.company.postal_code,
                    city: restaurantOwner.company.city,
                    capital: restaurantOwner.company.capital,
                    SIRET_number: restaurantOwner.company.SIRET_number,
                    retirement_fund_name: restaurantOwner.company.retirement_fund_name,
                    retirement_fund_address: restaurantOwner.company.retirement_fund_address,
                    retirement_fund_city: restaurantOwner.company.retirement_fund_city,
                    retirement_fund_postal_code: restaurantOwner.company.retirement_fund_postal_code
                },
                user: {
                    //username: state.adresse_mail,
                    email: state.adresse_mail,
                    password: password_dir,
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
      ).then((result) => {console.log(result)});


    }



      const estValide = (fieldValues = state) => {
      const validator = {};
      if ("nom" in fieldValues)
        validator.nom = state.nom ? null : "Le champ nom est obligatore";

      if ("prenom" in fieldValues)
        validator.prenom = state.prenom ? null : "Le champ prénom est obligatore";

      if ("adresse_mail" in fieldValues)
        validator.adresse_mail = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(adresse_mail)
          ? null
          : "Le mail n'est pas valide";

      if ("adresse" in fieldValues)
        validator.adresse = state.adresse ? null : "Le champ adresse est obligatore";

      if ("ville" in fieldValues)
        validator.ville = state.ville ? null : "Le champ ville est obligatore";

      if ("poste_occupe" in fieldValues)
        validator.poste_occupe = state.poste_occupe ? null : "Le champ poste occupée est obligatore";

      if ("code_postal" in fieldValues)
      validator.code_postal = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(
        code_postal
      )
        ? null
        : "Le code postal n'est pas valide";


      if ("num_tel" in fieldValues)
        validator.num_tel = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(
          num_tel
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
    } = useForm(initState, estValide);

    const { nom, prenom, adresse_mail,num_tel,code_postal, ville, adresse,poste_occupe } = state

    //state.prenom = restaurantOwner.prénom
    //Fonction permettant d'afficher les données récupérés
    //contenant => input modifiable
    //contenue => donnée à afficher

    const preAffichage = (contenant) => {
        if(contenant === undefined){
            state.nom = restaurantOwner.nom
            state.prenom = restaurantOwner.prénom
            state.adresse_mail = restaurantOwner.email
            state.num_tel = restaurantOwner.phone_number
            state.adresse = restaurantOwner.restaurant.address
            state.code_postal = restaurantOwner.restaurant.postal_code
            state.ville = restaurantOwner.restaurant.city
            state.poste_occupe = restaurantOwner.company_position

            console.log(contenant)
            return state.nom + ""
        }
        return contenant + ""

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Cas où le dirigeant entre ces informations pour la 1ere fois

        if(restaurantOwner === []){
            //reinitialiserState();
            if (estValide()) {
                sendrequest("post", "main/dirigeant/", null, null, state)
                .then((response) => {
                    if (response !== false && estValide()) {
                        setSuccess(true);
                        handleShow();
                    } else {
                        setSuccess(false);
                        handleShow();
                    }
                })
            }
        }
        else{
            updateData();
            setSuccess(true);
            handleShow();
            //RedirectionInfo();
        }

    };


        const RedirectionInfo = () => {
            let url = "/admin/mon-compte/infos-personnelles";
            history.push(url);
        }
        return (
        <>
                {restaurantOwner !== undefined && restaurantOwner.restaurant !== undefined ?
                    <form className="dirigeant_container" onSubmit={handleSubmit}>

                        <div className='dirigeant_label'>

                          <TextField
                          fullWidth
                          className='dirigeant_input'
                          id="outlined-basic"
                          variant="outlined"
                          label ="Nom du dirigeant"
                          name='nom'
                          value={preAffichage(state.nom)}
                          onChange={handleInputChange}
                          required/>
                          <div className='errors'>{errors.nom}</div>
                        </div>


                        <div className='dirigeant_label'>

                          <TextField
                            fullWidth
                            className='dirigeant_input'
                            id="outlined-basic"
                            variant="outlined"
                            label ="Prénom du dirigeant"
                            name='prenom'
                            value={preAffichage(state.prenom)}
                            onChange={handleInputChange}
                            required/>
                            <div className='errors'>{errors.prenom}</div>
                        </div>

                        <div className='dirigeant_label'>
                            <TextField
                            fullWidth
                            className='dirigeant_input'
                            id="outlined-basic"
                            variant="outlined"
                            label ="Adresse"
                            name='adresse'
                            value={preAffichage(state.adresse)}
                            onChange={handleInputChange}
                            required/>
                           <div className='errors'>{errors.adresse}</div>
                        </div>
                        <div className='dirigeant_adresse'>
                            <div className='dirigeant_label'>
                                <TextField
                                fullWidth
                                className='dirigeant_input'
                                id="outlined-basic"
                                variant="outlined"
                                label ="Code postal"
                                name='code_postal'
                                value={preAffichage(state.code_postal)}
                                onChange={handleInputChange}
                                required/>
                                <div className='errors'>{errors.code_postal}</div>
                            </div>


                            <div className='dirigeant_label'>
                                <TextField
                                fullWidth
                                className='dirigeant_input'
                                id="outlined-basic"
                                variant="outlined"
                                label ="Ville"
                                name='ville'
                                value={preAffichage(state.ville)}
                                onChange={handleInputChange}
                                required/>
                                <div className='errors'>{errors.ville}</div>
                            </div>
                          </div>
                        <div className='dirigeant_label'>
                            <TextField
                            fullWidth
                            className='dirigeant_input'
                            id="outlined-basic"
                            variant="outlined"
                            label ="Adresse mail"
                            name='adresse_mail'
                            value={state.adresse_mail}
                            onChange={handleInputChange}
                            required/>
                            <div className='errors'>{errors.adresse_mail}</div>
                        </div>

                        <div className='dirigeant_adresse'>
                            <div className='dirigeant_label'>
                                <TextField
                                fullWidth
                                className='dirigeant_input'
                                id="outlined-basic"
                                variant="outlined"
                                label ="Poste occupé"
                                value={preAffichage(state.poste_occupe)}
                                name='poste_occupe'
                                onChange={handleInputChange}
                                required/>
                                <div className='errors'>{errors.poste_occupe}</div>
                            </div>

                            <div className='dirigeant_label'>
                                <TextField
                                fullWidth
                                className='dirigeant_input'
                                id="outlined-basic"
                                variant="outlined"
                                label ="Numéro de téléphone"
                                name='num_tel'
                                value={state.num_tel}
                                onChange={handleInputChange}
                                required/>
                                <div className='errors'>{errors.num_tel}</div>
                            </div>
                          </div>
                        <div className='dirigeant_button'>
                            <button className="registre_button" type="submit">Enregistrer</button>
                            {/*<button className="edit_button" type="submit">Modifier</button>*/}
                        </div>

                        <ModalBootsrap
                            handleClose={handleClose}
                            show={show}
                            title={
                                <>
                                    {success ? "Envoyé" : "Oups"}
                                    <i
                                        className={
                                            `${success ? " fas fa-thumbs-up" : " fas fa-thumbs-down"}`}
                                        style={{color: "#4caf50", marginLeft: "1rem"}}></i>
                                </>
                            }>
                            {success ? "Enregistrement avec succès." : "Une erreur s'est produite, veuillez réessayer."}
                        </ModalBootsrap>
                    </form>
                    :null}
            </>

        );

}
export default UpdateFormDirigeant;
