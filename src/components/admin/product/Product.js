import React, { useEffect, useRef } from "react";

import "./product.css";
import "./productDisplay.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { getPrixAvecHT, splitPrix } from "../../../utilities";
import ExpandedIcon from "./ExpandedIcon";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ProductDisplay from "./ProductDisplay";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "#04295D",
    width: "20%",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    position: "relative",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    width: "20%",
  },
}));

const Product = ({
  commande,
  action = () => {},
  btn = null,
  btnImprimer = null,
  estPrisConnaissance = false,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [menus, setMenus] = useState([]);
  const [produits, setProduits] = useState([]);

  const fetchMenus = () => {
    setMenus(JSON.parse(commande.panier.infos_menus));
  };

  const fetchProduits = () => {
    setProduits(commande.panier.produits);
  };

  useEffect(() => {
    fetchMenus();
    fetchProduits();
    return () => {
      setMenus([]);
    };
  }, [produits]);

  return (
    <>
      <Accordion
        className={classes.accordion}
        key={commande.id}
        onChange={(e, expand) => setExpanded(expand)}
      >
        <AccordionSummary
          className={classes.accordion}
          // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {!expanded ? (
            <div className={classes.table}>
              <p className={classes.p}>
                {new Date(commande.date_commande).toLocaleDateString()}
              </p>
              <p className={classes.p}>
                {new Date(commande.date_commande)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </p>
              {/* <p className={classes.p}>{commande.reference}</p> */}
              <p className={classes.p}>
                {commande.client.nom[0] + "." + commande.client.prenom}
              </p>
              <p className={classes.p}>{commande.methode_vente}</p>
              <p className={"commande__prix " + classes.p}>
                {commande.prix_totale}€
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <p style={{ marginRight: "10px" }}>
                {new Date(commande.date_commande).toLocaleDateString()},{" "}
              </p>
              <p>
                {new Date(commande.date_commande)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </p>
            </div>
          )}

          <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
        </AccordionSummary>
        <AccordionDetails>
          <div className="product__container">
            {/* <CommandeList commandeItem={commande.panier.produits} /> */}
            <div className="commande__product">
              {produits &&
                produits.map((produit) => (
                  <ProductDisplay idPanierItem={produit} />
                ))}
            </div>

            <div className="commande__totale">
              {commande?.commentaire && (
                <div className="commande__commentaire">
                  <p className="bold-details">Commentaire :</p>
                  <p>{commande.commentaire}</p>
                </div>
              )}
              <div className="commande__totale__sous-totale">
                <p>Sous Total HT </p>
                <p>{splitPrix(getPrixAvecHT(commande.prix_totale, 10))}</p>
              </div>

              <div className="commande__totale-details">
                <div className="commande__totale-mode__container">
                  <p className="commande__ref">
                    <b>Reference :</b> {commande.reference}
                  </p>
                  <p className="commande__totale-mode">
                    {commande.methode_vente}
                  </p>
                </div>

                <div className="commande__totale-ttc">
                  <p>
                    Total <span>(TTC)</span>
                  </p>
                  <p>{commande.prix_totale}€</p>
                </div>
              </div>
            </div>

            <div className="commande__client">
              <p className="commande__client__nom">
                {commande.client.nom + " " + commande.client.prenom}
              </p>
              <p className="commande__client__adresse">
                {commande.client.adresse}, {commande.client.code_postale}{" "}
                {commande.client.ville}
              </p>
              <p className="commande__client__telephone">
                {commande.client.telephone}
              </p>
            </div>
            <div className="bouton__container">
              {btn && (
                <button
                  className={[
                    "commande__valider_btn",
                    estPrisConnaissance ? "terminer" : "",
                  ].join(" ")}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    action(commande.id, true);
                    setExpanded(!expanded);
                  }}
                >
                  {btn}
                </button>
              )}
              {btnImprimer && (
                <button
                  className={[
                    "commande__valider_btn",
                    estPrisConnaissance ? "terminer" : "",
                  ].join(" ")}
                  variant="contained"
                  color="primary"
                  onClick={() => action(commande.id, false)}
                >
                  {btnImprimer}
                </button>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Product;
