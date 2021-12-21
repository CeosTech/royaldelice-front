import { useState } from "react";
import star from "../../images/star.svg";
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Offcanvas} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
// hook window dimensions
import useDimensions from "../../hooks/useDim";

import "./carte.css";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Carte = ({
  setActive,
  active,
  activeCarte,
  setActiveCarte,
  categories,
  setDishesDisplay,
}) => {
  const createCategoriesList = categories.map((category) => ({
    libelle: category.nom,
    nom: category.nom,
    id: category.id,
  }));

  const [carte, setCarte] = useState(createCategoriesList);
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const { width } = useDimensions();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="carte">

    {/* Button for Side Menu */}
    <div className={classes.sectionMobile} >
            <div className="menu-arrow-forward" onClick={handleShow}>
            <ArrowForwardIcon  /> 
            </div>

          {/* Side Menu */}
          {width <= 960 && 
                      <Offcanvas show={show} onHide={handleClose} className="menu-offcanvas">
                        <Offcanvas.Body>
                          <div className="menu-side" >
                          
                          <div className="menu-arrow-back" onClick={handleClose}>
                            <ArrowBackIcon  /> 
                          </div>
                            
                              <div className="carte_contain">
                                <div className="carte__image-container">
                                  <Typography gutterBottom variant="h5" component="h1" className="carteTitle">
                                      <img src={star} className ="carteStar" /> CARTE <img src={star} className ="carteStar"/>
                                  </Typography>
                                </div>

                                <div className="carte__items">
                                {carte.map((carte) => (
                                    [1,2,3].includes(carte.id) ?
                                    <p
                                      key={carte.id}
                                      className={`carte__item ${active === carte.id ? "active" : ""}`}
                                      onClick={() => {
                                        setActive(carte.id);
                                        handleClose();
                                        setActiveCarte(false);
                                        setDishesDisplay(false);
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      {carte.libelle}
                                    </p>
                                  : null))}
                                  {carte.map((carte) => (
                                    [24].includes(carte.id) ?
                                    <p
                                      key={carte.id}
                                      className={`carte__item ${active === carte.id ? "active" : ""}`}
                                      onClick={() => {
                                        setActive(carte.id);
                                        handleClose();
                                        setActiveCarte(false);
                                        setDishesDisplay(false);
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      {carte.libelle}
                                    </p>
                                  : null))}

                                  {carte.map((carte) => (
                                    ![1,2,3,24].includes(carte.id) ?
                                    <p
                                      key={carte.id}
                                      className={`carte__item ${active === carte.id ? "active" : ""}`}
                                      onClick={() => {
                                        setActive(carte.id);
                                        handleClose();
                                        setActiveCarte(false);
                                        setDishesDisplay(false);
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      {carte.libelle}
                                    </p>
                                  : null))}
                                </div>
                              </div>
                            
                        </div>
                        </Offcanvas.Body>
                      
                    </Offcanvas>
          }
            {/* End of Side Menu */}
          </div>

          <div className={classes.sectionDesktop}>
          
                              <div className="carte_contain">
                                <div className="carte__image-container">
                                  <Typography gutterBottom variant="h5" component="h1" className="carteTitle">
                                      <img src={star} className ="carteStar" /> CARTE <img src={star} className ="carteStar"/>
                                  </Typography>
                                </div>

                                <div className="carte__items">
                                  {carte.map((carte) => (
                                    [1,2,3].includes(carte.id) ?
                                    <p
                                      key={carte.id}
                                      className={`carte__item ${active === carte.id ? "active" : ""}`}
                                      onClick={() => {
                                        setActive(carte.id);
                                        setActiveCarte(false);
                                        setDishesDisplay(false);
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      {carte.libelle}
                                    </p>
                                  : null))}
                                  {carte.map((carte) => (
                                    [24].includes(carte.id) ?
                                    <p
                                      key={carte.id}
                                      className={`carte__item ${active === carte.id ? "active" : ""}`}
                                      onClick={() => {
                                        setActive(carte.id);
                                        setActiveCarte(false);
                                        setDishesDisplay(false);
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      {carte.libelle}
                                    </p>
                                  : null))}

                                  {carte.map((carte) => (
                                    ![1,2,3,24].includes(carte.id) ?
                                    <p
                                      key={carte.id}
                                      className={`carte__item ${active === carte.id ? "active" : ""}`}
                                      onClick={() => {
                                        setActive(carte.id);
                                        setActiveCarte(false);
                                        setDishesDisplay(false);
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      {carte.libelle}
                                    </p>
                                  : null))}
                                </div>
                              </div>
                          
          </div>
    </div>
  );
};

export default Carte;
