import { useHistory } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import './qrcode.css';
function Menucode() {
	const history = useHistory();
	const faireRedirection = () => {
		let url = '/admin/Gestion_commerciale';
		history.push(url);
	};

	return (
		<div className="Container">
			<div className="Qrcode-header">
				<h1>Menu QR Code</h1>
			</div>
			<div className="nom">Menu Crocs de La Night</div>
			<div className="Gestioncommercial">
				<div className="QrcodeContent">
					<a href="https://lescrocsdelanight-site.web.app/carte">
						<img
							src="http://www.unitag.io/qreator/generate?setting=%7B%22EYES%22%3A%7B%22EYE_TYPE%22%3A%22Sharp%22%7D%2C%22E%22%3A%22H%22%2C%22BODY_TYPE%22%3A3%2C%22LAYOUT%22%3A%7B%22COLORBG%22%3A%22ffffff%22%2C%22GRADIENT_TYPE%22%3A%22NO_GR%22%2C%22COLOR1%22%3A%22000000%22%7D%2C%22LOGO%22%3A%7B%22L_NAME%22%3A%22https%3A%2F%2Fstatic-unitag.com%2Ffile%2Ffreeqr%2F075efb82ab4afc14654ea784c7143bf3.png%22%2C%22EXCAVATE%22%3Afalse%2C%22L_X_Norm%22%3A0.4%2C%22L_Y_Norm%22%3A0.428%2C%22L_WIDTH%22%3A0.2%2C%22L_LENGTH%22%3A0.142%7D%7D&data=%7B%22DATA%22%3A%7B%22URL%22%3A%22https%3A%5C%2F%5C%2Feqrcode.co%5C%2Fa%5C%2FF9xR0K%22%7D%2C%22TYPE%22%3A%22url%22%7D"
							alt="QR Code - Lescrocsdelanuit"
						/>
					</a>
				</div>
				<div className="societe_button">
					<a
						href={
							'http://www.unitag.io/qreator/generate?setting=%7B%22EYES%22%3A%7B%22EYE_TYPE%22%3A%22Sharp%22%7D%2C%22E%22%3A%22H%22%2C%22BODY_TYPE%22%3A3%2C%22LAYOUT%22%3A%7B%22COLORBG%22%3A%22ffffff%22%2C%22GRADIENT_TYPE%22%3A%22NO_GR%22%2C%22COLOR1%22%3A%22000000%22%7D%2C%22LOGO%22%3A%7B%22L_NAME%22%3A%22https%3A%2F%2Fstatic-unitag.com%2Ffile%2Ffreeqr%2F075efb82ab4afc14654ea784c7143bf3.png%22%2C%22EXCAVATE%22%3Afalse%2C%22L_X_Norm%22%3A0.4%2C%22L_Y_Norm%22%3A0.428%2C%22L_WIDTH%22%3A0.2%2C%22L_LENGTH%22%3A0.142%7D%7D&data=%7B%22DATA%22%3A%7B%22URL%22%3A%22https%3A%5C%2F%5C%2Feqrcode.co%5C%2Fa%5C%2FF9xR0K%22%7D%2C%22TYPE%22%3A%22url%22%7D'
						}
						target="_blank"
						download
					>
						<button className="reg_button" type="submit">
							Télecharger
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}
export default Menucode;
