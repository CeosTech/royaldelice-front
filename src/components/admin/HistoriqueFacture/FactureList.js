import React from 'react'
import { makeStyles } from "@material-ui/core";
import Facture from "./Facture";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "90%",
      margin: "3rem auto",
      alignItems: "center",
    },
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
  
    detail: {
      fontSize: theme.typography.pxToRem(16),
      color: "black",
    },
  
    color: {
      color: "black",
    },
  }));

  
  const FactureList = ({ factures }) => {
    
    const classes = useStyles();

      return (
        <div>
      {factures.length > 0 && (
        <>
          <div
            className={classes.table}
            style={{ borderBottom: "1px solid black" }}>
            <p className={classes.heading}>Montant HT en euros</p>
            <p className={classes.heading}>TVA</p>
            <p className={classes.heading}>Fournisseur</p>
            <p className={classes.heading}>Date d'achat</p>
          </div>
          {factures.map((facture) => (
            <Facture
              facture={facture}
              key={facture.id}
            />
          ))}
        </>
      )}
    </div>
      )
  }
  
  export default FactureList
  