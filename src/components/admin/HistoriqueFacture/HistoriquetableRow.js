import { IconButton, TableCell, TableRow, TableBody } from "@material-ui/core";

const HistoriqueTableRow = ({ facture }) => {
  //{/*commande.reference*/}
  console.log(facture);
  return (
    <TableRow>
      {/* {new Date(commande.date_commande).toLocaleString()} */}
      <TableCell align="center">{facture.montantHT}€</TableCell>
      <TableCell align='center'>{facture.montantTVA}%</TableCell>
      <TableCell align='center'>{facture.fournisseur}</TableCell>
      <TableCell align='center'>{facture.date_achat}</TableCell>
    </TableRow>
  );
};

export default HistoriqueTableRow;
