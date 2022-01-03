import React from 'react'
import { Grid } from '@material-ui/core';
import Logo_Fb from '../../images/Logo_Fb.png';
import Logo_Insta from '../../images/Logo_Insta.png';
import Logo_Mustang from '../../images/Logo_Royaldelice.png';
import './Footer.css';
import { useLocation } from "react-router-dom";
import CGV from "../../Documents/CGV-RoyalDelice.pdf";
import ML from "../../Documents/ML-RoyalDelice.pdf";


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
                        href="https://www.google.com/maps/place/Royal+Delice/@48.7676753,2.0176659,3a,75y,344.93h,91.88t/data=!3m6!1e1!3m4!1sR2qUtbvDtzJOLd29RVd6Hw!2e0!7i16384!8i8192!4m13!1m7!3m6!1s0x47e6814472a05af5:0x2a9cdea442016961!2s3+Rue+Jean+Goujon,+78180+Montigny-le-Bretonneux!3b1!8m2!3d48.7678374!4d2.0176193!3m4!1s0x47e6814472d0df0b:0xeaa22617e04f17e5!8m2!3d48.7677907!4d2.017703"                    
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
                      href="mailto:leroyaldelice.site@gmail.com"
                      rel="noreferrer"
                    > leroyaldelice.site@gmail.com</a>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>REJOIGNEZ-NOUS !</h5>
                    <p>
                      <a href="/" target="_blank" rel="noreferrer" >
                      <i className="fab fa-facebook-f"/>
                      </a>
                       &nbsp; 
                      <a href="https://www.instagram.com/lemustang93/?hl=fr" target="_blank" rel="noreferrer" >
                      <i className="fab fa-instagram"/>
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