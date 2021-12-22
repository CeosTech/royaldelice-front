import React, { Component } from 'react';
import adresse from '../../../images/contact/adresse.jpg';
import horaires from '../../../images/contact/horaires.jpg';
import { Link } from 'react-router-dom';
import './NousRetrouver.css';
class NousRetrouver extends Component {
	render() {
		return (
			<div className="nousRetrouver_container">
				<div className="img_container">
					<div className="nousRetrouver_img">
						<img className='image' src={adresse} alt="addresse du restaurent" />
					</div>
					<div className="nousRetrouver_img">
						<img className='image' src={horaires} alt="horaires du restaurent" />
					</div>
				</div>
				<div className="command_button">
					<Link to="/carte" className="telecharger_btn values__button">
						J'AI FAIM !
					</Link>
				</div>
			</div>
		);
	}
}
export default NousRetrouver;
