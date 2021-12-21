import React, { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import { sendrequest } from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import { TextField } from "@material-ui/core";

import "./societe.css";

const initial = {
  nom: "",
  prenom: "",
  adresse_mail: "",
  num_tel: "",
  code_postal: "",
  ville: "",
  adresse: "",
  poste_occupe: "",
};

const EditFormSociete = ({ restaurantOwner }) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initState, setInitState] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const estValide = (fieldValues = state) => {
    const validator = {};

    if ("denomination" in fieldValues)
      validator.denomination = state.denomination
        ? null
        : "Le champ nom est obligatore";

    if ("adresse_siege" in fieldValues)
      validator.adresse_siege = state.adresse_siege
        ? null
        : "Le champ prénom est obligatore";

    if ("code_postal_siege" in fieldValues)
      validator.code_postal_siege = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(
        code_postal_siege
      )
        ? null
        : "Le code postal n'est pas valide";

    if ("ville_siege" in fieldValues)
      validator.ville_siege = state.ville_siege
        ? null
        : "Le champ ville est obligatore";

    if ("SIRET_number" in fieldValues)
      validator.SIRET_number = /^[0-9]{14}$/.test(SIRET_number)
        ? null
        : "Le numéro de SIRET n'est pas valide";

    if ("etablissement" in fieldValues)
      validator.etablissement = state.etablissement
        ? null
        : "Le champ etablissement est obligatore";

    if ("adresse_etablissement" in fieldValues)
      validator.adresse_etablissement = state.adresse_etablissement
        ? null
        : "Le champ adresse etablissement est obligatore";

    if ("code_postal_etablissement" in fieldValues)
      validator.code_postal_etablissement =
        /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(code_postal_etablissement)
          ? null
          : "Le code postal n'est pas valide";

    if ("ville_etablissement" in fieldValues)
      validator.ville_etablissement = state.ville_etablissement
        ? null
        : "Le champ ville etablissement est obligatore";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, estValide);

  const {
    denomination,
    adresse_siege,
    code_postal_siege,
    ville_siege,
    SIRET_number,
    etablissement,
    adresse_etablissement,
    ville_etablissement,
    code_postal_etablissement,
  } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    sendrequest("post", "main/societe/", null, null, state).then((response) => {
      if (response !== false && estValide()) {
        setSuccess(true);
        handleShow();
      } else {
        setSuccess(false);
        handleShow();
      }
    });

    reinitialiserState();
    if (estValide()) {
    }
  };

  const RedirectionInfo = () => {
    let url = "/admin/mon-compte/infos-personnelles";
    history.push(url);
  };
  return (
    <div className="societe_container" onSubmit={handleSubmit}>
      <div className="societe_label">
        <TextField
          fullWidth
          label="Dénomination social"
          id="outlined-basic"
          variant="outlined"
          className="societe_input"
          name="denomination"
          value={denomination}
          onChange={handleInputChange}
          required
        />
        <div className="errors">{errors.denomination}</div>
      </div>

      <div className="societe_label">
        <TextField
          fullWidth
          label="Adresse du siège social"
          id="outlined-basic"
          variant="outlined"
          className="societe_input"
          name="adresse_siege"
          value={adresse_siege}
          onChange={handleInputChange}
          required
        />
        <div className="errors">{errors.adresse_siege}</div>
      </div>

      <div className="societe_adresse">
        <div className="societe_label">
          <TextField
            fullWidth
            label="Code postal"
            id="outlined-basic"
            variant="outlined"
            className="code_input"
            name="code_postal_siege"
            value={code_postal_siege}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.code_postal_siege}</div>
        </div>

        <div className="societe_label">
          <TextField
            fullWidth
            label="Ville"
            id="outlined-basic"
            variant="outlined"
            className="ville_input"
            name="ville_siege"
            value={ville_siege}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.ville_siege}</div>
        </div>
      </div>

      <div className="societe_label">
        <TextField
          fullWidth
          label="SIRET"
          id="outlined-basic"
          variant="outlined"
          type="number"
          className="societe_input"
          name="SIRET_number"
          value={SIRET_number}
          onChange={handleInputChange}
          required
        />
        <div className="errors">{errors.SIRET_number}</div>
      </div>

      <div className="societe_label">
        <TextField
          fullWidth
          label="Etablissement (lieu de travail des salariés)"
          id="outlined-basic"
          variant="outlined"
          className="societe_input"
          name="etablissement"
          value={etablissement}
          onChange={handleInputChange}
          required
        />
        <div className="errors">{errors.etablissement}</div>
      </div>

      <div className="societe_label">
        <TextField
          fullWidth
          label="Adresse de létablissement"
          id="outlined-basic"
          variant="outlined"
          className="societe_input"
          name="adresse_etablissement"
          value={adresse_etablissement}
          onChange={handleInputChange}
          required
        />
        <div className="errors">{errors.adresse_etablissement}</div>
      </div>

      <div className="societe_adresse">
        <div className="societe_label">
          <TextField
            fullWidth
            label="Code postal"
            id="outlined-basic"
            variant="outlined"
            className="code_input"
            name="code_postal_etablissement"
            value={code_postal_etablissement}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.code_postal_etablissement}</div>
        </div>

        <div className="societe_label">
          <TextField
            fullWidth
            label="Ville"
            id="outlined-basic"
            variant="outlined"
            className="ville_input"
            name="ville_etablissement"
            value={ville_etablissement}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.code_postal_etablissement}</div>
        </div>
      </div>

      <div className="societe_button">
        <button className="registre_button" type="submit">
          Enregistrer
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
    </div>
  );
};
export default EditFormSociete;
