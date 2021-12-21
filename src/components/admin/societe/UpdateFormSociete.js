import React, {useHistory} from "react-router-dom";
import  { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
 import {sendrequest} from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import {TextField} from '@material-ui/core';
import axios from "axios";
import {URL} from "../../../middlewares/request";

import './societe.css'

/*const initial = {
      nom: "",
      prenom: "",
      adresse_mail: "",
      num_tel: "",
      code_postal: "",
      ville:"",
      adresse:"",
      poste_occupe:"",

};*/

const UpdateFormSociete = ({restaurantOwner}) => {

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
                nom: restaurantOwner.nom,
                prénom: restaurantOwner.prénom,
                email: restaurantOwner.email,
                phone_number: restaurantOwner.phone_number,
                company_position: restaurantOwner.company_position,
                restaurant: {
                    name: state.etablissement,
                    address: state.adresse_etablissement,
                    postal_code: state.code_postal_etablissement,
                    city: state.ville_etablissement,
                    phone_number: restaurantOwner.restaurant.phone_number
                },
                company: {
                    name: state.denomination,
                    address: state.adresse_siege,
                    postal_code: state.code_postal_siege,
                    city: state.ville_siege,
                    capital: restaurantOwner.company.capital,
                    SIRET_number: state.SIRET_number,

                    retirement_fund_name: restaurantOwner.company.retirement_fund_name,
                    retirement_fund_address: restaurantOwner.company.retirement_fund_address,
                    retirement_fund_city: restaurantOwner.company.retirement_fund_city,
                    retirement_fund_postal_code: restaurantOwner.company.retirement_fund_postal_code
                },
                user: {
                    //username: state.adresse_mail,
                    email: state.adresse_mail,
                    password: password_dir
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
      ).then((result) => {console.log(result.data)});

      //console.log(res.data);

    }



      const estValide = (fieldValues = state) => {
      const validator = {};

       if ("denomination" in fieldValues)
              validator.denomination = state.denomination ? null : "Le champ nom est obligatore";

          if ("adresse_siege" in fieldValues)
              validator.adresse_siege = state.adresse_siege ? null : "Le champ prénom est obligatore";

          if ("code_postal_siege" in fieldValues)
              validator.code_postal_siege = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(
                  code_postal_siege
              )
                  ? null
                  : "Le code postal n'est pas valide";


          if ("ville_siege" in fieldValues)
              validator.ville_siege = state.ville_siege ? null : "Le champ ville est obligatore";

           if ("SIRET_number" in fieldValues)
        validator.SIRET_number = /^[0-9]{14}$/.test(
            SIRET_number
        )
            ? null
            : "Le numéro de SIRET n'est pas valide";

          if ("etablissement" in fieldValues)
              validator.etablissement = state.etablissement ? null : "Le champ etablissement est obligatore";

          if ("adresse_etablissement" in fieldValues)
              validator.adresse_etablissement = state.adresse_etablissement ? null : "Le champ adresse etablissement est obligatore";

          if ("code_postal_etablissement" in fieldValues)
              validator.code_postal_etablissement = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(
                  code_postal_etablissement
              )
                  ? null
                  : "Le code postal n'est pas valide";

          if ("ville_etablissement" in fieldValues)
              validator.ville_etablissement = state.ville_etablissement ? null : "Le champ ville etablissement est obligatore";



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

    const { denomination, adresse_siege, ville_siege,adresse_etablissement,code_postal_siege,SIRET_number, etablissement, code_postal_etablissement} = state

    //state.prenom = restaurantOwner.prénom
    //Fonction permettant d'afficher les données récupérés
    //contenant => input modifiable
    //contenue => donnée à afficher
    const preAffichage = (contenant) => {
        if(contenant === undefined){
            state.denomination = restaurantOwner.company.name
            state.adresse_siege = restaurantOwner.company.address
            state.ville_siege = restaurantOwner.company.city
            state.SIRET_number = restaurantOwner.company.SIRET_number
            state.code_postal_siege = restaurantOwner.company.postal_code

            state.adresse_etablissement = restaurantOwner.restaurant.address
            state.ville_etablissement = restaurantOwner.restaurant.city
            state.etablissement =  restaurantOwner.restaurant.name
            state.code_postal_etablissement=restaurantOwner.restaurant.postal_code


            console.log(contenant)
            return state.denomination + ""
        }
        return contenant + ""

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(restaurantOwner === []){
            //reinitialiserState();
            if (estValide()) {
                sendrequest("put", "main/societe/", null, null, state)
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
            RedirectionInfo();
        }

    };


        const RedirectionInfo = () => {
            let url = "/admin/mon-compte/infos-personnelles";
            history.push(url);
        }
        return (
        <>
                {restaurantOwner !== undefined && restaurantOwner.restaurant !== undefined ?

                    <form className="societe_container" onSubmit={handleSubmit}>

                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Dénomination sociale"
                            id="outlined-basic"
                            variant="outlined"
                            className='societe_input'
                            name='denomination'
                            value={preAffichage(state.denomination)}
                            onChange={handleInputChange}
                            required/>
                                <div className="errors">{errors.denomination}</div>
                        </div>


                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Adresse du siège social"
                            id="outlined-basic"
                            variant="outlined"
                            className='societe_input'
                            name='adresse_siege'
                            value={preAffichage(state.adresse_siege)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.adresse_siege}</div>
                        </div>


                    <div className='societe_adresse'>
                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Code postal"
                            id="outlined-basic"
                            variant="outlined"
                            className='code_input'
                            name='code_postal_siege'
                            value={preAffichage(state.code_postal_siege)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.code_postal_siege}</div>
                        </div>

                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Ville"
                            id="outlined-basic"
                            variant="outlined"
                            className='ville_input'
                            name='ville_siege'
                            value={preAffichage(state.ville_siege)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.ville_siege}</div>
                        </div>
                    </div>

                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="SIRET"
                            id="outlined-basic"
                            variant="outlined"
                            type='number'
                            className='societe_input'
                            name='SIRET'
                            value={preAffichage(state.SIRET_number)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.SIRET_number}</div>
                        </div>



                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Etablissement (lieu de travail des salariés)"
                            id="outlined-basic"
                            variant="outlined"
                            className='societe_input'
                            name='etablissement'
                            value={preAffichage(state.etablissement)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.etablissement}</div>
                        </div>


                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Adresse de létablissement"
                            id="outlined-basic"
                            variant="outlined"
                            className='societe_input'
                            name='adresse_etablissement'
                            value={preAffichage(state.adresse_etablissement)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.adresse_etablissement}</div>
                        </div>

                    <div className='societe_adresse'>
                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Code postal"
                            id="outlined-basic"
                            variant="outlined"
                            className='code_input'
                            name='code_postal_etablissement'
                            value={preAffichage(state.code_postal_etablissement)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.code_postal_etablissement}</div>
                        </div>

                        <div className='societe_label'>
                        <TextField
                            fullWidth
                            label ="Ville"
                            id="outlined-basic"
                            variant="outlined"
                            className='ville_input'
                            name='ville_etablissement'
                            value={preAffichage(state.ville_etablissement)}
                            onChange={handleInputChange}
                            required/>
                            <div className="errors">{errors.code_postal_etablissement}</div>
                        </div>
                    </div>

                        <div className='societe_button'>
                            <button className="registre_button" type="submit">Enregistrer</button>

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
export default UpdateFormSociete;
