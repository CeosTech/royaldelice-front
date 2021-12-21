import { makeStyles } from "@material-ui/core";
import Client from "./Client";

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

  column: {
    display: "flex",
    flexDirection: "column",
  },

  detail: {
    fontSize: theme.typography.pxToRem(16),
    color: "black",
  },

  color: {
    color: "black",
  },
}));

const ListClient = ({ clients }) => {
  const classes = useStyles();

  return (
    <div>
      {clients.length > 0 && (
        <>
          <div
            className={classes.table}
            style={{ padding: "0 1rem", borderBottom: "1px solid black" }}>

            <p className={classes.heading}>Nom</p>
            <p className={classes.heading}>Prénom</p>

            <p className={classes.heading}>Adresse</p>
            <p className={classes.heading}>Email</p>

            <p className={classes.heading}>Montant</p>
          </div>

          {clients.map((client) => (
            <Client
              client={client}
              key={client.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListClient;
