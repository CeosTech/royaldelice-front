import React, { useHistory } from "react-router-dom";
import  { useState } from "react";
import useForm from "../../../hooks/useForm";
import {sendrequest} from "../../../middlewares/request"
import ModalBootsrap from "../../modal/Modal";
import {TextField} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import './creationcdi.css'
const initial = {
      nom_entreprise: "",
      prenom_employeur: "",
      nom_de_employeur: "",
      etablissement:"",
      adresse_etablissement:"",
      code_postal_etablissement:"",
      ville_etablissement:""

};


  function Societe() {



    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

              if ("adresse_employe" in fieldValues)
              validator.adresse_employe = state.adresse_employe ? null : "Le champ adresse est obligatore";


          setErrors({...validator});
          setErrors({...validator});

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

    const { entreprise, employeur,employeur_nom, code_postal_siege,ville_siege,SIRET_number, etablissement, adresse_etablissement,code_postal_etablissement,ville_etablissement,pays_etablissement,sexe_employe,prenom_employe,nom_employe,naissance_employe,nationalite_employe,numss_employe,numsejour_employe,numdetitre_employe,adresse_employe,codepostale_employe,ville_employe,pays_employe,date,poste_employe,statut_employe,missions_employe,adresse_travail,ville_travail,pays_travail,codepostal_travail} = state

        const handleSubmit = (e) => {
        e.preventDefault();

        sendrequest("post", "main/societe/", null, null, state)
            .then((response) => {
                if (response !== false && estValide()) {
                    setSuccess(true);
                    handleShow();
                } else {
                    setSuccess(false);
                    handleShow();
                }
            })


        reinitialiserState();
        if (estValide()) {

        }
    };


    const history = useHistory();

    const fRedirection = () =>{ 
      let url = "/admin//Gestion_des_ressources_humaines/Contratdetravail";
      history.push(url);
    }
  return (
    <div className="societe" >
        <div className="societe-header">
            <i className="fas fa-arrow-left" onClick={fRedirection}></i>
            <h1>Crée CDI</h1>
        
        </div>
        <div className="societe_container">
        
        <h4>Employeur: </h4>
               
             
                    <form className="societe_container" onSubmit={handleSubmit}>
                    <div className='societe_adresse'>  
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Nom de l'entreprise"
                            id="outlined-basic"
                            variant="outlined" 
                            className='societe_input' 
                            name='entreprise' 
                            value={entreprise} 
                            onChange={handleInputChange} 
                            required/>
                                <div className="errors">{errors.adresse_entreprise}</div>
                        </div>
                        
                        
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Prénom de l'employeur"
                            id="outlined-basic"
                            variant="outlined"
                            className='societe_input' 
                            name='employeur' 
                            value={employeur} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.prenom_employeur}</div>
                        </div>

                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Nom de l'employeur"
                            id="outlined-basic"
                            variant="outlined"
                            className='societe_input' 
                            name='employeur_nom' 
                            value={employeur_nom} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.nom_employeur_nom}</div>
                        </div>
                        
                        </div>
                    
                        

                       
                    <div className='societe_adresse'>
                         <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Adresse "
                            id="outlined-basic"
                            variant="outlined" 
                            className='societe_input'
                            name='adresse_etablissement' 
                            value={adresse_etablissement} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.adresse_etablissement}</div>
                        </div>
                
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Code postal"
                            id="outlined-basic"
                            variant="outlined"
                            className='code_input' 
                            name='code_postal_etablissement' 
                            value={code_postal_etablissement} 
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
                            value={ville_etablissement} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.ville_etablissement}</div>
                        </div>
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Pays"
                            id="outlined-basic"
                            variant="outlined" 
                            className='pays_input' 
                            name='pays_etablissement' 
                            value={pays_etablissement} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.pays_etablissement}</div>
                        </div>
                    </div>
                    <div>

                   
                        <div>
                        <h4>Employé: </h4>
                        </div>
                        <div className='societe_adresse'>
                        <div className='societe_label'>
                      
                        <FormControl variant="outlined" className="societe_label">
              <InputLabel id="demo-simple-select-outlined-label">
                Civilité
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sexe_employe}
                onChange={handleInputChange}
                label="Age"
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                <MenuItem value={10}>Monsieur</MenuItem>
                <MenuItem value={20}>Madame</MenuItem>
                <MenuItem value={30}>Mademoiselle</MenuItem>
              </Select>
            </FormControl>
           
              
                            
                            <div className="errors">{errors.civilite_employe}</div>
                        </div>



                        
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Prénom de l'employé"
                            id="outlined-basic"
                            variant="outlined" 
                            className='prenomemploye_input' 
                            name='prenom_employe' 
                            value={prenom_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.prenom_employe}
                            </div>
                        </div>
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Nom de l'employé"
                            id="outlined-basic"
                            variant="outlined" 
                            className='nomemploye_input' 
                            name='nom_employe' 
                            value={nom_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.nom_employe}
                            </div>
                             </div> 
                             <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Date de naissance"
                            id="outlined-basic"
                            variant="outlined" 
                            fullWidth
                             id="outlined-basic"
                            variant="outlined"
                             name="date"
                             type="date"
                             value={date}
                             onChange={handleInputChange}
                             required
                            />
                             <div className="errors">{errors.date}</div>
                          </div>




                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Nationalité"
                            id="outlined-basic"
                            variant="outlined" 
                            className='nationalite_input' 
                            name='nationalite_employe' 
                            value={nationalite_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.nationalite_employe}
                            </div>
                        </div>
                    
                        
                        </div>
                        
                        <div className='societe_adresse'>
                        <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Numéro de Sécurité sociale"
                            id="outlined-basic"
                            variant="outlined" 
                            className='numss_input' 
                            name='numss_employe' 
                            value={numss_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.num_SS_employe}
                            </div>
                            </div>

                            <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Titre de séjour(étranger)"
                            id="outlined-basic"
                            variant="outlined" 
                            className='numsejour_input' 
                            name='numsejour_employe' 
                            value={numsejour_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.numsejour_employe}
                            </div>
                            </div>

                            <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Numéro d'odre du titre"
                            id="outlined-basic"
                            variant="outlined" 
                            className='numdetitre_input' 
                            name='numdetitre_employe' 
                            value={numdetitre_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.numdetitre_employe}
                            </div>
                            </div>




                            </div>

                            <div className='societe_adresse'>
                                
                            <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Adresse"
                            id="outlined-basic"
                            variant="outlined" 
                            className='adresseemploye_input' 
                            name='adresse_employe' 
                            value={adresse_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.adresse_employe}
                            </div>
                            </div>

                            <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Code postal"
                            id="outlined-basic"
                            variant="outlined" 
                            className='codepostaleemploye_input' 
                            name='codepostale_employe' 
                            value={codepostale_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.codepostale_employe}
                            </div>
                            </div>

                            <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Ville"
                            id="outlined-basic"
                            variant="outlined" 
                            className='villeemploye_input' 
                            name='ville_employe' 
                            value={ville_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.ville_employe}
                            </div>
                            </div>

                            <div className='societe_label'>
                        <TextField 
                            fullWidth
                            label ="Pays"
                            id="outlined-basic"
                            variant="outlined" 
                            className='paysemploye_input' 
                            name='pays_employe' 
                            value={pays_employe} 
                            onChange={handleInputChange} 
                            required/>
                            <div className="errors">{errors.pays_employe}
                            </div>
                            </div>

                                
                            </div>
                           
                        
                         
                          <div/>

                    </div>
                        <div className='societe_button'>
                            <button className="registr_button" type="submit">Suivant</button>
                            
                        </div>
                        <div>

                        </div>
                        

                        <h4>Poste: </h4>
                        <div className='societe_adresse'>
                                
                                
                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Poste"
                                id="outlined-basic"
                                variant="outlined" 
                                className='posteemploye_input' 
                                name='poste_employe' 
                                value={poste_employe} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.poste_employe}
                                </div>
                                </div>
    
                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Statut"
                                id="outlined-basic"
                                variant="outlined" 
                                className='statutemploye_input' 
                                name='statut_employe' 
                                value={statut_employe} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.statut_employe}
                                </div>
                                </div>
    
                              
                                    
                                </div>

                                <div className='societe_adresse'>
                                
                                
                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Description du poste et des missions"
                                id="outlined-basic"
                                variant="outlined" 
                                className='missionsemploye_input' 
                                name='missions_employe' 
                                value={missions_employe} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.missions_employe}
                                </div>
                                </div>
    
                               
                              
                                    
                                </div>
                                <h4>Lieu de travail: </h4>
                                <div className='societe_adresse'>
                                
                                
                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Adresse"
                                id="outlined-basic"
                                variant="outlined" 
                                className='adressetravail_input' 
                                name='adresse_travail' 
                                value={adresse_travail} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.adresse_travail}
                                </div>
                                </div>
    
                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Code postal"
                                id="outlined-basic"
                                variant="outlined" 
                                className='codepostaletravail_input' 
                                name='codepostal_travail' 
                                value={codepostal_travail} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.codepostal_travail}
                                </div>
                                </div>

                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Ville"
                                id="outlined-basic"
                                variant="outlined" 
                                className='villetravail_input' 
                                name='ville_travail' 
                                value={ville_travail} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.ville_travail}
                                </div>
                                </div>



                                <div className='societe_label'>
                            <TextField 
                                fullWidth
                                label ="Pays"
                                id="outlined-basic"
                                variant="outlined" 
                                className='paystravail_input' 
                                name='pays_travail' 
                                value={pays_travail} 
                                onChange={handleInputChange} 
                                required/>
                                <div className="errors">{errors.pays_travail}
                                </div>
                                </div>
                              
                              
                                    
                                </div>




                               
                            
                             
                              <div/>
    


                    </form>
        </div>
        
    </div>


);

}
export default Societe;

