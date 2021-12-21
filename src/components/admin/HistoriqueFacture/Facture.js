import React, { useEffect, useRef } from "react";

import "./HistoriqueFacture.css";
import fileDownload from "js-file-download";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import ExpandedIcon from "../product/ExpandedIcon";
import axios from "axios";
import {URL} from "../../../middlewares/request";
import { useHistory} from "react-router";



const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "black",
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

const Facture = ({ facture }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleDownload = (url, filename) =>{
    axios.get(url, {
      responseType: "blob",
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }

  const history = useHistory()

  const val =facture.id

  const deleteData =async () =>{
 
    axios.delete(URL + "comptabilite/facture/"+val);
    let currentPath = window.location.pathname;
    history.replace(`${currentPath}/replace`);
    setTimeout(() => {
        history.replace(currentPath)
    }, 1000)
    // console.log(val)
  }

  const date_facture = new Date(facture.date_achat).toLocaleDateString();

  return (
    <>
      <Accordion
        className={classes.accordion}
        key={facture.id}
        onChange={(e, expand) => setExpanded(expand)}>
        <AccordionSummary
          className={classes.accordion}
          // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {!expanded ? (
            <div className={classes.table}>
              <p className={classes.p}>{facture.montantHT}€</p>
              <p className={classes.p}>{facture.montantTVA}%</p>
              {/* <p className={classes.p}>{commande.reference}</p> */}
              <p className={classes.p}>{facture.fournisseur}</p>
              <p className={classes.p}>{date_facture}</p>
            </div>
          ) : (
            <div>
            </div>
          )}

          <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
        </AccordionSummary>
        <AccordionDetails>
          <div className="facture__container">
            <div className="facture__fournisseur">
              <h1 className="fournisseur_fact">{facture.fournisseur}</h1>
            </div>
            <div className="facture__montantHT">
              <h2 className="montantHT_fact">{facture.montantHT}€</h2>
            </div>
            <div className="facture__montantTVA">
              <h3 className="montantTVA_fact">{facture.montantTVA}%</h3>
            </div>
            <div className="facture__date">
              <p className="date_fact">{date_facture}</p>
            </div>
            <div className="facture__photo">
              <img className="photo_fact" src={facture.photo_facture} />
            </div>
            <div className="facture__button">
              <a href={facture.photo_facture} target="_blank" download>
              <button className="registre__button" onClick={() => {handleDownload()
              }}>Télécharger</button>
              </a>
              <button className="supp_button" onClick={()=>{deleteData(facture.id)}}>Supprimer</button>
            </div>

          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Facture;
