import React, { Component } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import Logo_Royaldelice from '../../../images/Logo_Royaldelice.png';
import { Grid } from '@material-ui/core';

class Header extends Component {
	render() {
		return (
			<div id="header">
				<Grid container  justifyContent="center" className="Grid_Container">
					<div className="image-logo">
						<img src={Logo_Royaldelice} alt="logo du site web" />
					</div>
					<div className="Div_Text_Header">
						<strong>
							Bienvenue au Royaume du Goût <br /> et des Saveurs !<br />
							Disponible à emporter ou en livraison ;)
						</strong>
						<br />
						<Button id="Btn_Commander_Accueil">
							<Link to="/carte" className="commanderHeader">
								<strong>J'AI FAIM !</strong>
							</Link>
						</Button>
					</div>
				</Grid>
			</div>
		);
	}
}

export default Header;
