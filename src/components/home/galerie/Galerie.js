import React, { Component, Fragment } from 'react';
import './Cards.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Typography from '@material-ui/core/Typography';
import image1 from '../../../images/Galerie/galerie1.png';
import image2 from '../../../images/Galerie/galerie2.png';
import image3 from '../../../images/Galerie/galerie3.png';
import image4 from '../../../images/Galerie/galerie4.png';
import image5 from '../../../images/Galerie/galerie5.png';


function Galerie() {
	return (
		<>
			<div className="cards">
				<div className="galeriePage" id="galerie">
					<div className="galerieTitleContainer TITRE-container">
						<Typography gutterBottom variant="h5" component="h1" className="galerieTitle">
							NOTRE MENU
						</Typography>
						<br />
					</div>
				</div>
				<ul className="cards__items_1">
					<li>
						<Zoom>
							<img className='menu_img' alt="Menu Royal Delice" src={image1} width="500" height="300" />
						</Zoom>
					</li>
					<li>
						<Zoom>
							<img className='menu_img' alt="Menu Royal Delice" src={image2} width="500" height="300" />
						</Zoom>
					</li>
					<li>
						<Zoom>
							<img className='menu_img' alt="Menu Royal Delice" src={image3} width="500" height="300" />
						</Zoom>
					</li>
				</ul>
				<ul className="cards__items_2">
					<li>
						<Zoom>
							<img id='img1' className='menu_img' alt="Menu Royal Delice" src={image4} width="500" height="300" />
						</Zoom>
					</li>
					<li>
						<Zoom>
							<img id='img2' className='menu_img' alt="Menu Royal Delice" src={image5} width="500" height="300" />
						</Zoom>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Galerie;
