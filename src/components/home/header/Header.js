import React, { Component } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";


import {Grid } from '@material-ui/core';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <Grid container alignItems="center" justifyContent="center" className="Grid_Container">
                    
                        <div className="Div_Text_Header"><strong>Bienvenu au Royaume du Goût <br></br> et des Saveurs !<br></br> 
                        Disponible à emporter ou en livraison ;)</strong>
                        <br></br>
                        <Button id="Btn_Commander_Accueil">
                            <Link to="/carte" className="commanderHeader">
                                <strong>J'AI FAIM</strong>
                            </Link>
                        </Button>
                        </div>
                        
                       
                        
                </Grid>           
            </div>
        );
    }
}

export default Header;