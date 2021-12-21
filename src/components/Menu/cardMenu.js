import React, { useState } from "react";
import "./card.css";
import SideDish from "../SideDish/sidesList";

import { sendrequest } from "../middlewares/request";

import { FormControlLabel, Radio } from "@material-ui/core";

const CardMenu = ({
  nom,
  disponibilite,
  image,
  id,
  categorie,
  sur_grill,
  supplement,
  prix_supplement,
  sideDishChosen,
  setSideDishChosen,
  error,
  setError,
  setNoSidesSelected,
  setPrixSupplement,
  prixSupplement,
}) => {
  const [show, setShow] = useState(false);

  const [datas, setDatas] = useState([]);
  // Booleans that will only allow the component to render when the requests have returned the datas
  const [isDataLoading, setDataLoading] = useState(false);

  const fetchData = async () => {
    sendrequest(
      "get",
      "mustang/produit/?accompagnement=true",
      setDatas,
      setDataLoading
    );
  };

  useState(() => {
    fetchData();
  });

  const orderSideDish = () => {
    if (sur_grill) {
      setShow(true);
    }
    setPrixSupplement({ ...prixSupplement, [categorie]: `${prix_supplement}` });
  };

  return (
    // Depending on the availability or not of the item, the css style will vary, thanks to a different className
    <div className="cardMenu__command__container">
      <div
        className={
          "cardMenu__item " + (!disponibilite ? "item_unavailable" : "")
        }
      >
        <h1 className="cardMenu__item__heading">{nom}</h1>
        <div className="cardMenu__item__image-container">
          <img src={image} alt={nom} />
        </div>

        {supplement && <p>supplément : {prix_supplement}€</p>}

        {disponibilite && (
          <FormControlLabel
            value={nom}
            control={<Radio />}
            id={id}
            className="radio-choice__menu"
            onClick={() => orderSideDish()}
          />
        )}

        {/* If the item is non available, this will be displayed */}
        {!disponibilite && <p>Produit non disponible</p>}
      </div>

      <SideDish
        supplement={prix_supplement}
        prix__supplement={prix_supplement}
        show={show}
        setShow={setShow}
        sideDishes={datas}
        value={sideDishChosen}
        setValue={setSideDishChosen}
        error={error}
        setError={setError}
        setNoSidesSelected={setNoSidesSelected}
        setPrixSupplement={setPrixSupplement}
      />
    </div>
  );
};

export default CardMenu;
