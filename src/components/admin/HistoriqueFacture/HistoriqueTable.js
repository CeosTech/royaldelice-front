import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HistoriqueTableRow from "./HistoriqueTableRow";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "3rem auto",
    maxWidth: 1200,
  },

  heading: {
    fontWeight: "bold",
  },

  rowConfig: {
    borderWidth: 3,
  },
});

export default function HistoriqueTable({ factures }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow className={classes.rowConfig}>
            <TableCell className={classes.heading}>Montant HT en euros</TableCell>
            <TableCell className={classes.heading} align='center'>
              TVA
            </TableCell>
            <TableCell className={classes.heading} align='center'>
              Fournisseur
            </TableCell>
            <TableCell className={classes.heading} align='center'>
              Date d'achat
            </TableCell>
          </TableRow>
        </TableHead>
        {factures?.map((facture) => (
          <HistoriqueTableRow key={facture.id} facture={facture} />
        ))}
      </Table>
    </TableContainer>
  );
}
