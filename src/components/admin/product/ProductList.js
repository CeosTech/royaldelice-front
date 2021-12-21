import { makeStyles } from "@material-ui/core";
import Product from "./Product";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "3rem auto",
    alignItems: "center",
  },
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
  detail: {
    fontSize: theme.typography.pxToRem(16),
    color: "#04295D",
  },
  color: {
    color: "#04295D",
  },
}));
const ProductList = ({
  commandes,
  action,
  btn,
  btnImprimer,
  estPrisConnaissance,
}) => {
  const classes = useStyles();
  return (
    <div>
      {commandes?.length > 0 && (
        <>
          <div
            className={classes.table}
            style={{ padding: "0 1rem", borderBottom: "1px solid black" }}
          >
            <p className={classes.heading}>Date</p>
            <p className={classes.heading}>Heure</p>
            <p className={classes.heading}>Client</p>
            <p className={classes.heading}>Méthode de vente</p>
            <p className={classes.heading}>Montant TTC</p>
          </div>
          {/*
            Modification de nouvelle commande :
              - Rajouter l'information sur le type de commande (Livraison/Emporter)
              - Lorsqu'on appui sur les détails afficher les informations de chaque produit
              - Dupliquer le design de nouvelle commande dans 
       */}
          {commandes.map((commande) => (
            <Product
              key={commande.nom}
              commande={commande}
              action={action}
              btn={btn}
              btnImprimer={btnImprimer}
              estPrisConnaissance={estPrisConnaissance}
            />
          ))}
        </>
      )}
    </div>
  );
};
export default ProductList;
