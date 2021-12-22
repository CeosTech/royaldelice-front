import React, { useEffect, useState } from 'react';
import './Plats.css';

import image1 from '../../../images/Plats/Rectangle1.jpg';
import image2 from '../../../images/Plats/Rectangle2.jpg';
import image3 from '../../../images/Plats/Rectangle3.jpg';
import star from '../../../images/star.svg';

import Carousel from 'react-bootstrap/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			justifyContent: 'center'
		}
	},
	sectionMobile: {
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}));

const data = [
	{
		id: 1,
		titre: 'Nos Tacos',
		text: 'Dévorez nos délicieux tacos garnis de viandes, frites et sauce fromagère maison :)',
		prix: 'Top des ventes !',
		photo: image1
	},
	{
		id: 2,
		titre: 'Nos Burgers',
		text: 'Tous nos burgers sont faits maison et sont élaborés à partir d’ingrédients de qualité !',
		prix: 'À partir de 5€00',
		photo: image2
	},
	{
		id: 3,
		titre: 'Nos Desserts',
		text: 'Découvrez notre carte des desserts : tiramisu, brownie, tarte au daim…',
		prix: 'À partir de 8€00',
		photo: image3
	}
];

const Plats = () => {
	const classes = useStyles();
	const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

	const handleResize = (e) => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<div className="plats" id="plats">
			<div className="platsTitleContainer">
				<Typography gutterBottom variant="h5" component="h1" className="platsTitle">
					NOS BEST SELLERS
				</Typography>
			</div>

			{windowWidth >= 960 ? (
				
					<div className="plats-card">
						{data.map((content) => (
							<Card className="cardItem">
								<img src={content.photo} alt="Contemplative Reptile" />

								<CardContent>
									<Typography gutterBottom variant="h5" component="h2" className="cardTitle">
										{content.titre}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className="cardText"
									>
										{content.text}
									</Typography>
									<Typography variant="body2" color="textDanger" component="p" className="cardPrice">
										{content.prix}
									</Typography>
								</CardContent>
							</Card>
						))}
					</div>
			) : (
				<Carousel pause={false} className="slider-card">
					{data.map((content) => (
						<Carousel.Item interval={5000} className="px-3" key={content.titre}>
							<Card className="cardItem">
								<img src={content.photo} alt="Contemplative Reptile" />
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2" className="cardTitle">
										{content.titre}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className="cardText"
									>
										{content.text}
									</Typography>
									<Typography variant="body2" color="textDanger" component="p" className="cardPrice">
										{content.prix}
									</Typography>
								</CardContent>
							</Card>
						</Carousel.Item>
					))}
				</Carousel>
			)}

			<div className="command_button">
				<Link to="/carte" className="telecharger_btn values__button">
					Commander
				</Link>
			</div>
		</div>
	);
};

export default Plats;
