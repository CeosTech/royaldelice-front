import React, { useEffect, useMemo } from "react";
// import { IconButton, makeStyles } from "@material-ui/core";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotFoundPage from "../../pages/NotFoundPage";

import "./adminPage.css";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../../app/Redux-slices/adminSlice";
import AdminNav from "./menu/Menu";
import NouvelleCommande from "./nouvelleCommande/NouvelleCommande";
import Suivi from "./suivi/Suivi";
import Disponibilte from "./disponibilite/Disponibilite";
import DisponibiliteLivraison from "./disponibilite/DisponibiliteLivraison";
import ZoneLivraison from "./zoneLivraison/ZoneLivraison"
import HistoriqueCommande from "./historiqueCommande/HistoriqueCommande";
import CommandeEnCours from "./commandeEnCours/CommandeEnCours";
import GestionProduits from "./gestionProduits";

import FichierContact from "./contact/FichierContact";
import BddClient from "./bddClient/BddClient";
import MonCompte from "./monCompte/MonCompte";
import InfoPerso from "./infoPerso/InfoPerso";
import Societe from "./societe/Societe";
import Caisse from "./caisse/Caisse";
import Dirigeant from "./dirigeant/Dirigeant";
import Menucode from "./qrcode/Qrcode";
import bellUrl from "./sounds/bell.mp3";
import Comptabilite from "./Comptabilite/Comptabilite";
import FactureAchats from "./factureAchats/FactureAchats";
import FactureRegister from "./factureRegister/factureregister";
import Gestiondesstocks from "./Gestiondesstocks/Gestiondesstocks";
import Gestiondesressourceshumaines from "./Gestiondesrh/Gestiondesrh";
import Gestioncommerciale from "./Gestioncommerciale/Gestioncommerciale";
import Contratdetravail from "./contratdetravail/Contratdetravail";
import Creationcdi from "./creationcdi/Creationcdi";
import HistoriqueFacture from "./HistoriqueFacture/historiquefacture.js";

// const useStyles = makeStyles({
//   root: {
//     position: "absolute",
//     top: 0,
//     right: 10,
//   },
// });

const AdminPage = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const haveLength = useMemo(
    () => admin.nouvelleCommandeLength > 0,
    [admin.nouvelleCommandeLength]
  );

  // console.log(path, url); //  /admin

  useEffect(() => {
    // console.log("changement");
    dispatch(changePage(admin.currentPage));
    history.push(path + "/nouvelles-commandes");
  }, []);

  return (
    <div className="adminPage">
      {/* <IconButton className={classes.root}>
        <ExitToAppIcon style={{ fontSize: 40 }} />
      </IconButton> */}

      {haveLength && <audio src={bellUrl} autoPlay loop></audio>}

      <div className="adminPage__container">
        <AdminNav />
        <div style={{ flex: 1, padding: "1rem", width: "100%" }}>
          <Switch>
            <Route exact path={path + "/nouvelles-commandes"}>
              <NouvelleCommande />
            </Route>
            <Route exact path={path + "/commande-en-cours"}>
              <CommandeEnCours />
            </Route>
            <Route exact path={path + "/historiques"}>
              <HistoriqueCommande />
            </Route>
            <Route exact path={path + "/suivi-activites"}>
              <Suivi />
            </Route>
            {/*<Route exact path={path + "/disponibles-plats"}>
              <Disponibilte />
            </Route>*/}
            <Route exact path={path + "/disponibles-livraison"}>
              <DisponibiliteLivraison />
            </Route>
            <Route exact path={path + "/zone-livraison"}>
              <ZoneLivraison />
            </Route>
            <Route exact path={path + "/fichiers-contacts"}>
              <FichierContact />
            </Route>
            <Route exact path={path + "/mon-compte"}>
              <MonCompte />
            </Route>
            <Route exact path={path + "/mon-compte/infos-personnelles"}>
              <InfoPerso />
            </Route>
            <Route
              exact
              path={path + "/mon-compte/infos-personnelles/la-societe"}
            >
              <Societe />
            </Route>
            <Route exact path={path + "/mon-compte/infos-personnelles/caisse"}>
              <Caisse />
            </Route>
            <Route exact path={path + "/Comptabilite"}>
              <Comptabilite />
            </Route>
            <Route exact path={path + "/Qrcode"}>
              <Menucode />
            </Route>
            <Route exact path={path + "/Comptabilite/facture-achats"}>
              <FactureAchats />
            </Route>
            <Route
              exact
              path={path + "/Comptabilite/facture-achats/enregistrer-factures"}
            >
              <FactureRegister />
            </Route>

            <Route
              exact
              path={path + "/Comptabilite/facture-achats/historiquefactures"}
            >
              <HistoriqueFacture />
            </Route>

            <Route exact path={path + "/Gestion_des_stocks"}>
              <Gestiondesstocks />
            </Route>
            <Route exact path={path + "/Gestion_des_ressources_humaines"}>
              <Gestiondesressourceshumaines />
            </Route>
            <Route
              exact
              path={path + "/mon-compte/infos-personnelles/dirigeant"}
            >
              <Dirigeant />
            </Route>
            <Route exact path={path + "/Gestion_commerciale"}>
              <Gestioncommerciale />
            </Route>
            <Route exact path={path + "/clients"}>
              <BddClient />
            </Route>
            <Route
              exact
              path={path + "/Gestion_des_ressources_humaines/Contratdetravail"}
            >
              <Contratdetravail />
            </Route>
            <Route
              exact
              path={
                path +
                "/Gestion_des_ressources_humaines/Contratdetravail/Creationcdi"
              }
            >
              <Creationcdi />
            </Route>
            <Route exact path={path + "/produits"}>
                <GestionProduits />
              </Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
