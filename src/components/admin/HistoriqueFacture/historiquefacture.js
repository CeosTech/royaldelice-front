import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import FactureList from "./FactureList";
import "./HistoriqueFacture.css";
import { URL } from "../../../middlewares/request";

const HistoriqueFacture = () => {
  const [factures, setFactures] = useState([]);
  const [facturesFilter, setFacturesFilter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const fetchFactures = async () => {
    const { data } = await axios.get(URL + "comptabilite/facture/");
    console.log(data);
    setFactures(data);
  };

  useEffect(() => {
    fetchFactures();

    console.log(facturesFilter);

    return () => setFactures([]);
  }, []);

  const history = useHistory();
  const faireRedirection = () => {
    let url = "/admin/Comptabilite/";
    history.push(url);
  };

  const [aujourdhui_ca, setAujourdhuiCa] = useState(null);
  const [calendar, setCalendar] = useState(new Date().toLocaleDateString());
  const [calendar_ca, setCalendarCa] = useState(null);

  const aujourdhui = new Date().getTime(); //// 11/03/2021

  const dateFormat = FactureList.date_achat;

  //const dateFormat= "jj/mm/aaaa"

  const get_suivi_jour = async (val) => {
    console.log(val);
    const { data } = await axios.get(
      URL + "comptabilite/facture/?date_achat=" + val
    );
    setFacturesFilter(data);
    setIsFilter(true);
  };

  const get_ca_by_calendar = (e) => {
    // console.log(e.target.valueAsNumber);
    // console.log(e.target.valueAsDate);
    // console.log(new Date(e.target.valueAsNumber).toDateString()); //// Tue Mar 09 2021

    setCalendar(new Date(e.target.valueAsNumber).getTime());
    let tmp = new Date(e.target.valueAsNumber).getTime();
    //const { debut, fin } = get_time_debut_fin(new Date(e.target.valueAsNumber));
    get_suivi_jour(tmp);
  };

  //  useEffect(() => {
  //const { debut, fin } = get_time_debut_fin(new Date().getTime());

  // get_suivi_jour(new Date().getTime());
  //}, []);
  const reset = () => {
    //let url= "admin/Comptabilite/facture-achats/HistoriqueFactures/"
    //window.location.href=url;
    let currentPath = window.location.pathname;
    history.replace(`${currentPath}/replace`);
    setTimeout(() => {
      history.replace(currentPath);
    }, 0);
  };

  return (
    <>
      <div className="main">
        <div className="dirigeant-header">
          <i className="fas fa-arrow-left" onClick={faireRedirection}></i>
          <h1>Historique des factures</h1>
        </div>
        <div className="suivi_activite__jour_exacte-calendrier">
          <label>Calendrier: </label>
          <input type="date" onChange={get_ca_by_calendar} />
        </div>
        <div className="historiqueCommande admin__container">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#04295d",
            }}
          >
            {factures.length ? "Vos factures" : "Pas de factures"}
          </h1>
          {isFilter ? (
            <FactureList factures={facturesFilter} />
          ) : (
            <FactureList factures={factures} />
          )}
        </div>
        <div className="res_button">
          <button className="reset_button" onClick={reset}>
            reinitialiser
          </button>
        </div>
      </div>
    </>
  );
};

export default HistoriqueFacture;
