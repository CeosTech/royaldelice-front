import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './creationMenus.css';

import Category from './creationCategorie';
import Ingredient from './creationIngredients';
import Supplement from './creationSupplement';

const CreationMenus = () => {
	const history = useHistory();

	const [ category, setCategory ] = useState(false);
	const [ ingredients, setIngredients ] = useState(false);
	const [ produit, setProduit ] = useState(false);
	const [ supplements, setSupplements ] = useState(false);

	return (
		<div className='creation_menus'>
			<div id="creation_menus_container">
				<button
					className="button Button_creation"
					onClick={() => {
						setCategory(true);
					}}
				>
					Créer une catégorie
				</button>
				{category ? (
					<Category
						close={(bool) => {
							setCategory(bool);
						}}
					/>
				) : null}
				<button
					className="button Button_creation"
					onClick={() => {
						setIngredients(true);
					}}
				>
					Créer des ingrédients
				</button>
				{ingredients ? (
					<Ingredient
						close={(bool) => {
							setIngredients(bool);
						}}
					/>
				) : null}
			</div>

			<div id="creation_menus_container">
				<button
					className="button Button_creation"
					onClick={() => {
						let url = '/admin/produits';
						history.push(url);
					}}
				>
					Créer un produit
				</button>
				<button
					className="button Button_creation"
					onClick={() => {
						setSupplements(true);
					}}
				>
					Créer des suppléments
				</button>
				{supplements ? (
					<Supplement
						close={(bool) => {
							setSupplements(bool);
						}}
					/>
				) : null}
			</div>
		</div>
	);
};

export default CreationMenus;
