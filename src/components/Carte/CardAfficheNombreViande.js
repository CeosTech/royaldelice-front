import React from "react";
import Modal from "../MyModal/Modal";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";

export default function CardAfficheNombreViande({
  viande_nombre,
  viande__Selected,
  handleChangeViande,
  setViande__Selected,
  choixSupplementViande,
  error,
  setError,
  errorUnique,
}) {
  return (
    <>
      <Modal.Body.Heading
        style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
      >
        Viande {viande_nombre}
      </Modal.Body.Heading>
      <FormControl component="fieldset">
        <RadioGroup
          name="viande_"
          value={viande__Selected}
          onChange={handleChangeViande}
        >
          {choixSupplementViande?.map((data) => {
            return (
              <div className="sides-radioGroup" key={data.id}>
                <FormControlLabel
                  value={data.nom}
                  control={<Radio />}
                  id={data.id}
                  className="radio-choice__menu"
                  onClick={() => {
                    setError(false);
                    setViande__Selected(data.nom);
                  }}
                />
                <Modal.Body.Heading>{data.nom}</Modal.Body.Heading>
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
      {error && <p className="error">Veuillez sélectionner un élément</p>}
      {errorUnique && (
        <p className="error">Veuillez sélectionner jusqu'à 1 élément maximum</p>
      )}
      <div className="separation_ligne"> </div>
    </>
  );
}
