import { MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import Menu from "./Menu";
import "./menuType.css";

import { sendrequest } from "../middlewares/request";

import entree from '../../images/menu-p-d-b.png';
import drink from '../../images/menu-p-d-b.png';
import dessert from '../../images/menu-p-d-b.png';


const MenuType = ({menuCategories, dishesDisplayed, setDishesDisplay}) => {
    const [menuChosen, setMenuChosen] = useState([]);
    const [datas, setDatas] = useState([]);

    // Booleans that will only allow the component to render when the requests have returned the datas
    const [isDataLoading, setDataLoading] = useState(false);

    const setMenuType = (menu) => {
      setMenuChosen(menu);
      setDishesDisplay(true);
    }

    const fetchData = async () => {
        sendrequest("get", "mustang/produit/?au_menu=true", setDatas, setDataLoading);
    };

    useState(() => {
        fetchData();
    });

    const menuType = [
        {
            'name': 'Menu entrée + plat + boisson',
            'price': 14,
            'categories': [
                {
                    'name': 'entrée',
                    'id': 'Entrées',
                },
                {
                    'name': 'plat',
                    'id': 'Plats',
                },{
                    'name': 'boisson',
                    'id': 'Boissons',
                },
            ],
            'text' : 'votre entrée, votre plat et votre boisson',
            'img': entree,
        },
        {
            'name': 'Menu plat + boisson',
            'price': 10,
            'categories': [
                {
                    'name': 'plat',
                    'id': 'Plats',
                },{
                    'name': 'boisson',
                    'id': 'Boissons',
                },
            ],
            'text' : 'votre plat et votre boisson',
            'img': drink,
        },
        {
            'name': 'Menu plat + boisson + dessert',
            'price': 14,
            'categories': [
                {
                    'name': 'plat',
                    'id': 'Plats',
                },
                {
                    'name': 'dessert',
                    'id': 'Desserts',
                },
                {
                    'name': 'boisson',
                    'id': 'Boissons',
                },
            ],
            'text' : 'votre plat, votre boisson et votre dessert',
            'img': dessert,
        },        
    ];

  return (
    <>  
        <h2 className="menu__ordering-time">Du lundi au vendredi<br/>entre 11h et 14h </h2>  
        <div className="menu__type-items">    
            {!dishesDisplayed && (
                menuType.map(menu => (
                    <div 
                        key={menu.name}
                        className="menu__type-item"
                        onClick={() => setMenuType(menu)}
                    >
                        <h3>{menu.name}</h3>
                        <img src={menu.img} alt="plat" className="menu__header-img"/>
                        <p>{menu.price}€</p>
                    </div>
                ))
            )}
        </div> 

        {dishesDisplayed && (
            <div className="dishes__displayed-menu">
                <button 
                    onClick={() => setDishesDisplay(false)}
                    className="menu__go-back"
                >
                    Retour
                </button>
                <Menu
                    datas={datas} 
                    menuCategories={menuCategories} 
                    menuChosen={menuChosen}
                />
            </div>
        )}

    </>
  );
};

export default MenuType;