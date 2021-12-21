import { useHistory } from "react-router-dom";
import { useState } from "react";
import useForm from "../../../hooks/useForm";
import { sendrequest, URL } from "../../../middlewares/request";
import ModalBootsrap from "../../modal/Modal";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

import "./caisse.css";
import axios from "axios";

const initial = {
  denomination: "",
  adresse: "",
  code_postal: "",
  ville: "",
};

const EditFormCaisse = ({ restaurantOwner }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = window.$token_access;
  const email = window.$email_dirigeant;

  const updateData = async () => {
    const res = await axios
      .put(
        URL + "accounts/restaurantowner/" + restaurantOwner.id + "/",
        {
          nom: state.nom,
          prenom: state.prenom,
          email: state.adresse_mail,
          phone_number: state.num_tel,
          company_position: state.poste_occupe,
          restaurant: {
            name: restaurantOwner.restaurant.name,
            address: state.adresse,
            postal_code: state.code_postal,
            city: state.ville,
            phone_number: restaurantOwner.restaurant.phone_number,
          },
          company: {
            name: restaurantOwner.company.name,
            address: restaurantOwner.company.address,
            postal_code: restaurantOwner.company.postal_code,
            city: restaurantOwner.company.city,
            capital: restaurantOwner.company.capital,
            SIRET_number: restaurantOwner.company.SIRET_number,
            retirement_fund_name: restaurantOwner.company.retirement_fund_name,
            retirement_fund_address:
              restaurantOwner.company.retirement_fund_address,
            retirement_fund_city: restaurantOwner.company.retirement_fund_city,
            retirement_fund_postal_code:
              restaurantOwner.company.retirement_fund_postal_code,
          },
          user: {
            //username: state.adresse_mail,
            email: state.adresse_mail,
            password: restaurantOwner.user.password,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      });

    //console.log(res.data);
  };

  const estValide = (fieldValues = state) => {
    const validator = {};

    if ("denomination" in fieldValues)
      validator.denomination = state.denomination
        ? null
        : "Le champ dénomination est obligatore";

    if ("adresse" in fieldValues)
      validator.denomination = state.denomination
        ? null
        : "Le champ adresse est obligatore";

    if ("ville" in fieldValues)
      validator.ville = state.ville ? null : "Le champ ville est obligatore";

    if ("code_postal" in fieldValues)
      validator.code_postal = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(
        code_postal
      )
        ? null
        : "Le code postal n'est pas valide";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, estValide);

  const { denomination, code_postal, ville, adresse } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    /* sendrequest("post", "main/caisse/", null, null, state)
            .then((response) => {
                if (response !== false && estValide()) {
                    setSuccess(true);
                    handleShow();
                } else {
                    setSuccess(false);
                    handleShow();
                }
            })*/

    reinitialiserState();
    if (estValide()) {
    }

    if (restaurantOwner === []) {
      //reinitialiserState();
      if (estValide()) {
        sendrequest("post", "main/caisse/", null, null, state).then(
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
      }
    } else {
      updateData();
      RedirectionInfo();
    }
  };

  const history = useHistory();

  const RedirectionInfo = () => {
    let url = "/admin/mon-compte/infos-personnelles";
    history.push(url);
  };
  return (
    <div className="caisse">
      <div className="caisse_title">
        <h2>Caisse de retraite complémentaire</h2>
      </div>

      <div className=" caisse_container" onSubmit={handleSubmit}>
        <div className="caisse_div">
          <TextField
            className="caisse_input"
            fullWidth
            label="Dénomination social"
            id="outlined-basic"
            variant="outlined"
            name="denomination"
            value={denomination}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.denomination}</div>
        </div>
        <div className="caisse_div">
          <TextField
            className="caisse_input"
            fullWidth
            label="Adresse"
            id="outlined-basic"
            variant="outlined"
            name="adresse"
            value={adresse}
            onChange={handleInputChange}
            required
          />
          <div className="errors">{errors.adresse}</div>
        </div>
        <div className="adresse_caisse">
          <div className="caisse_div">
            <TextField
              className="caisse_input"
              fullWidth
              label="Code Postal"
              id="outlined-basic"
              variant="outlined"
              name="code_postal"
              value={code_postal}
              onChange={handleInputChange}
              required
            />
            <div className="errors">{errors.code_postal}</div>
          </div>
          <div className="caisse_div">
            <TextField
              className="caisse_input"
              fullWidth
              label="Ville"
              id="outlined-basic"
              variant="outlined"
              name="ville"
              value={ville}
              onChange={handleInputChange}
              required
            />
            <div className="errors">{errors.ville}</div>
          </div>
        </div>
        <div className="caisse_button">
          <button className="registre_caisse_button" type="submit">
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
    </div>
  );
};
export default EditFormCaisse;
