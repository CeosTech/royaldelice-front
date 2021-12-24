import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./creationMenus.css";

import Category from "./creationCategorie";
import Ingredient from "./creationIngredients";
import Supplement from "./creationSupplement";

const CreationMenus = () => {
    const history = useHistory();

    const [category, setCategory] = useState(false)
    const [ingredients, setIngredients] = useState(false)
    const [produit, setProduit] = useState(false)
    const [supplements, setSupplements] = useState(false)

    return (
        <div id="creation_menus">
            <button className="button" onClick={() => { setCategory(true) }}>Créer une catégorie</button>
            {category ? <Category close={(bool) => { setCategory(bool) }} /> : null}
            <button className="button" onClick={() => { setIngredients(true) }}>Créer des ingrédients</button>
            {ingredients ? <Ingredient close={(bool) => { setIngredients(bool) }} /> : null}
            <button className="button" onClick={() => {
                let url = "/admin/produits";
                history.push(url);
            }}>Créer un produit</button>
            <button className="button" onClick={() => { setSupplements(true) }}>Créer des suppléments</button>
            {supplements ? <Supplement close={(bool) => { setSupplements(bool) }} /> : null}
        </div>
    );
};


export default CreationMenus;