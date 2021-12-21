import React, { useEffect, useRef } from "react";

import "./contact.css";

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
import ReadMoreReact from 'read-more-react';


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
    minHeight: "100px",
    position: "relative",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 15,
    width: "150px",
  },

  detail: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 12,
  },

  message: {
    marginTop: "5%",
    fontSize: 13,
    maxWidth: "150px",
    wordWrap: "break-word",
    textAlign: "justify",
  },

  message_header: {
   marginHorizontal: 10,
  },

  headerStyle: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 15,
  },

  message_container: {
    display: "flex",
    flexDirection: "column",
  },

  message_content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    marginLeft: "15%",
    marginRight: "15%",
  },

  message_response: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "2%",
  },

  contentStyle: {
    textAlign: "justify",
  },

  '@media(minWidth: 780px)' : {
    width: '80%'
  }
}));

const Contact = ({ contact }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Accordion
        className={classes.accordion}
        key={contact.id}
        onChange={(e, expand) => setExpanded(expand)}>
        <AccordionSummary
          className={classes.accordion}
          // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {!expanded ? (
            <div className={classes.table}>
                <div>
                  <p className={classes.p}>{contact.nom}</p>
                  <p className={classes.p}>{contact.prenom}</p>
                </div>
                <div>
                  <p className={classes.p}>{contact.email}</p>
                  <p className={classes.p}>{contact.telephone}</p>
                </div>
                <div>
                  <p className={classes.p}>{contact.apport}</p>
                  <p className={classes.p}>{contact.echeance}</p>
                </div>
                <div>
                   <p className={classes.message}>
                    <ReadMoreReact
                        text={contact.message}
                        min={80}
                        ideal={80}
                        max={80}
                        readMoreText="... voir plus"/>
                  </p>
                   <p className={classes.p}>
                   {new Date(contact.date_message)
                      .toLocaleTimeString()
                      .split(":")
                      .slice(0, 2)
                      .join("h")}
                       - 
                    {new Date(contact.date_message).toLocaleDateString()}
                    </p>
                 
                </div>
            </div>
          ) : (
            <div className={classes.table}>
                <div>
                  <p className={classes.p}>{contact.nom}</p>
                  <p className={classes.p}>{contact.prenom}</p>
                </div>
                <div>
                  <p className={classes.p}>{contact.email}</p>
                  <p className={classes.p}>{contact.telephone}</p>
                </div>
                <div>
                  <p className={classes.p}>{contact.apport}</p>
                  <p className={classes.p}>{contact.echeance}</p>
                </div>
                <p className={classes.p}></p>
                
            </div>
          )}
        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.message_container}>
            <div className={classes.message_content}>
                <p className={classes.contentStyle}>{contact.message}</p>
            </div>
            {/*<div className={classes.message_response}>
                <button
                className={"commande__valider_btn"}
                variant='contained'
                color='primary'>
                Répondre au message
              </button>
            </div>*/}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Contact;
