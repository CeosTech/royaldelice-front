import React, { useEffect, useRef } from "react";

import "./client.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { getPrixAvecTTC, splitPrix } from "../../../utilities";
import ExpandedIcon from "../product/ExpandedIcon";




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
    justifyContent: "space-between",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    //height: "100px",
    position: "relative",
  },
  p: {
    marginTop: "1%",
    fontWeight: "bold",
    margin: 0,
    fontSize: 15,
    width: "20%",
    textAlign: "center",
    wordWrap: "break-word",
  },
  mess: {
    fontSize: 13,
    width: "15%",
    textAlign: "justify",
  },
  message_response: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //marginLeft: "40%",
    marginTop: "3%",
    marginBottom: "2%",
  },
}));

const Client = ({ client }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Accordion
        className={classes.accordion}
        key={client.id}
        >
        <AccordionDetails
          className={classes.accordion}
          aria-controls='panel1a-content'
          id='panel1a-header'>
            <div className={classes.table}>
              <p className={classes.p}>{client.nom}</p>
              <p className={classes.p}>{client.prenom}</p>
              <p className={classes.p}>{client.adresse}</p>
              <p className={classes.p}>{client.email}</p>
              <p className={classes.p}>{client.montant}€</p>
            </div>
            {/*<ExpandedIcon expanded={expanded} setExpanded={setExpanded} />*/}
        </AccordionDetails>
        {/*<AccordionDetails className={classes.message_response}>
            <div>
                <button
                className={"commande__valider_btn"}
                variant='contained'
                color='primary'>
                Envoyer un message
              </button>
            </div>
        </AccordionDetails>*/}
      </Accordion>
    </>
  );
};

export default Client;
