import React from 'react'
import { Grid } from '@material-ui/core';
import Logo_Fb from '../../images/Logo_Fb.png';
import Logo_Insta from '../../images/Logo_Insta.png';
import Logo_Mustang from '../../images/Logo_Royaldelice.png';
import './Footer.css';
import { useLocation } from "react-router-dom";
import CGV from "../../Documents/CGV_MUSTANG_BONDY.pdf";
import ML from "../../Documents/ML_MUSTANG_BONDY.pdf";


const Footer = () => {
  const location = useLocation();

  const regex = /^\/admin/g;
  //   ne pas afficher dans la page admin
  if (!location.pathname.match(regex)) {
    return (
      <div >
            <Grid container id="footer">
              <Grid container className="footer-logo-border" justifyContent="center" xs={12} md={2}>
                <a href="/#header">
                  <img src={Logo_Mustang} alt="logo Mustang Footer"></img>
                </a>
              </Grid>
              <Grid container className="footer-text" direction="row" xs={12} md={10}>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>ADRESSE</h5>
                    <p>
                      <a 
                        className="footer-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/maps/place/24+Rue+Jules+Guesde,+93140+Bondy/"                    
                      >
                        Centre Commercial du Manet <br/>3 rue Jean Goujon<br/> 78180 Montigny-le-Bretonneux 
                      </a>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>HORAIRES</h5>
                    <p>Lundi au Samedi : 11h00 - 22h00</p>
                    <p>Dimanche : 11h30 - 22h30</p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>CONTACT</h5>
                    <p>
                    <a class="footer-link" href="tel:01-30-43-26-35"> 01 30 43 26 35 </a>
                       <br></br> 
                    <a 
                      className="footer-link" 
                      href="mailto:lemustang93.site@gmail.com"
                      rel="noreferrer"
                    > leroyaldelice.site@gmail.com</a>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>REJOIGNEZ-NOUS !</h5>
                    <p>
                      <a href="/" target="_blank" rel="noreferrer" >
                        <img src={Logo_Fb}></img>
                      </a>
                       &nbsp; 
                      <a href="https://www.instagram.com/lemustang93/?hl=fr" target="_blank" rel="noreferrer" >
                      <img src={Logo_Insta}></img>
                      </a>
                    </p>
                  </Grid>

                  

              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{backgroundColor:'rgb(87, 43, 131)'}}>
                
                    <span className="footer-copyright">Copyright 2021 ©  |  Made by <a 
                      className="footer-link" 
                      target="_blank" 
                      rel="noreferrer" 
                      href="http://www.ceostech.fr/"
                    > Ceos Tech </a>  |  <a className="footer-link" href={CGV} target="_blank">CGV</a>  |  <a className="footer-link" href={ML} target="_blank">Mentions Légales </a></span>
                
            </Grid>
        </div>
  
    ) }

    return null;
  };
  export default Footer;