import { makeStyles } from "@material-ui/core";
import Contact from "./Contact";

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
    justifyContent: "space-between",
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

const ListeContact = ({ contacts }) => {
  const classes = useStyles();

  return (
    <div>
      {contacts.length > 0 && (
        <>
          <div
            className={classes.table}
            style={{ padding: "0 1rem", borderBottom: "1px solid black" }}>
            <div className={classes.column}>
            <p className={classes.heading}>Nom</p>
            <p className={classes.heading}>Prénom</p>
            </div>
            <div className={classes.column}>
            <p className={classes.heading}>Mail</p>
            <p className={classes.heading}>Téléphone</p>
            </div>
            <div className={classes.column}>
            <p className={classes.heading}>Apport</p>
            <p className={classes.heading}>Echeance</p>
            </div>
            <p className={classes.heading}>Message</p>
          </div>

          {contacts.map((contact) => (
            <Contact
              contact={contact}
              key={contact.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListeContact;
