import React, { Component } from 'react';
import "./Galerie.css";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import star from "../../../images/star.svg";

import image1 from "../../../images/Galerie/galerie1.jpg";
import image2 from "../../../images/Galerie/galerie2.jpg";
import image3 from "../../../images/Galerie/galerie3.png";
import image4 from "../../../images/Galerie/galerie4.jpg";
import image5 from "../../../images/Galerie/galerie5.jpg";
import image6 from "../../../images/Galerie/galerie6.png";
import image7 from "../../../images/Galerie/galerie7.jpg";
import image8 from "../../../images/Galerie/galerie8.jpg";
import image9 from "../../../images/Galerie/galerie9.jpg";


const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

const Galerie = () => {
    const classes = useStyles();

    return (
        
        <div className="galeriePage" id="galerie">
            <div className="galerieTitleContainer">
                <Typography gutterBottom variant="h5" component="h1" className="galerieTitle">
                NOTRE MENU 
                </Typography>
            </div>
            <div className={classes.sectionDesktop}>
                <div className="galerieContainer">
                    <div className="galerieLine">
                        <img src={image1} className="galerieImg" />
                        <img src={image2} className="galerieImg" />
                        <img src={image3} className="galerieImg image3" />
                    </div>

                    <div className="galerieLine">
                        <img src={image4} className="galerieImg" />
                        <img src={image5} className="galerieImg" />
                        <img src={image6} className="galerieImg" />
                    </div>

                    <div className="galerieLine">
                        <img src={image7} className="galerieImg" />
                        <img src={image8} className="galerieImg image8" />
                        <img src={image9} className="galerieImg image9" />
                    </div>
                </div>
            </div>
            <div className={classes.sectionMobile}>
                <div className="gallerie-mobile-version">
                    <Grid container >
                        <Grid container direction="column" alignItems="center" xs={6}>
                            <img src={image1} className="galerieImgMobile" />
                            <img src={image2} className="galerieImgMobile" />
                            <img src={image3} className="galerieImgMobile" />
                        </Grid>
                        <Grid container direction="column" alignItems="center" xs={6}>
                            <div className="gallerie-image-down-mobile">
                                <img src={image4} className="galerieImgMobile" />
                                <img src={image5} className="galerieImgMobile" />
                                <img src={image6} className="galerieImgMobile" />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
        
    );
}


export default Galerie;