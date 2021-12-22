import React, { Component } from 'react';
import "./Cards.css";
import CardItem from './CardItem';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import image1 from "../../../images/Galerie/galerie1.png";
import image2 from "../../../images/Galerie/galerie2.png";
import image3 from "../../../images/Galerie/galerie3.png";
import image4 from "../../../images/Galerie/galerie4.png";
import image5 from "../../../images/Galerie/galerie5.png";

// import image5 from "../../../images/Galerie/galerie5.jpg";
// import image6 from "../../../images/Galerie/galerie6.png";
// import image7 from "../../../images/Galerie/galerie7.jpg";
// import image8 from "../../../images/Galerie/galerie8.jpg";
// import image9 from "../../../images/Galerie/galerie9.jpg";



function Galerie() {
    return (
        <>

      <div className="cards">
        {/* <div className="cards__container"></div> */}
        <div className="galeriePage" id="galerie">
            <div className="galerieTitleContainer">
                <Typography gutterBottom variant="h5" component="h1" className="galerieTitle">
                     GALERIE
                </Typography>
                <br />
            </div>
            </div>
        {/* <div className="cards_wrapper"></div> */}
        <ul className="cards__items">
          <CardItem
            src={image1}
            path='/'
            />
          <CardItem
            src={image2}
            path='/'
            />
          <CardItem
            src={image3}
            path='/'
            />
        </ul>
        <ul className="cards__items">
          <CardItem
          src={image4}
          path='/'
          />
          <CardItem
          src={image5}
          path='/'
          />
        </ul>
      </div>
      </>
    );
}

export default Galerie;