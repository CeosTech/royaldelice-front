import React, { useState, useEffect } from "react";
import "./styles.css";


import CardMenu from "./cardMenu";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addMenu } from "../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../app/Redux-slices/alertsSlice";

import {
    FormControl,
    RadioGroup,
  } from "@material-ui/core";
  import { Button, IconButton } from "@material-ui/core";
  import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
  import RemoveIcon from "@material-ui/icons/Remove";
  import AddIcon from "@material-ui/icons/Add";

// Do not delete : import allow to receive the images and display them from the parent component.
import entree from '../../images/menu-p-d-b.png';
import drink from '../../images/menu-p-d-b.png';
import dessert from '../../images/menu-p-d-b.png';

const Menu = ({datas, menuCategories, menuChosen}) => {
    const dispatch = useDispatch();

    const [menu, setMenu] = useState({});
    const [error, setError] = useState({});
    const [sideDishChosen, setSideDishChosen] = useState(null);  
    const [errorSideDish, setErrorSideDish] = useState(false);
    const [isNoSideSelected, setNoSidesSelected] = useState(false);
    const [prixSupplement, setPrixSupplement] = useState([]);
    const [totalPrice, setTotalPrice] = useState(menuChosen.price);

    const [quantite, setQuantite] = useState(1);
    
    const calculateTotalPrice = () => {
        if(prixSupplement.constructor !== Array) {
            {/*prixSupplement is an object that stores for each part of the menu if there is a supplement. We loop through this object to make the sum of the supplements */}
            const supplementPrice = Object.values(prixSupplement).reduce((a, b) => parseFloat(a) + parseFloat(b));   
            const total = parseFloat(menuChosen.price) + parseFloat(supplementPrice);
            setTotalPrice(total);
        }
    }

    useEffect(() => {
        calculateTotalPrice();
    });

   

    const handleChange = (event) => {
        const categoryName= event.target.name;
        const productChosen= event.target.value;
        if (categoryName === 'plat'){
            setNoSidesSelected(false)
        }
        if(!errorSideDish) {        
            setMenu({...menu, [categoryName]: `${productChosen}`})
            const newError = error;
            delete newError.categoryName;
            setError(JSON.stringify(newError));
        }
    };
        
    const verifyForm = () => {
        let errorMessages = {};
        let isError = false;
        menuChosen.categories.forEach(category => {
            const categoryName = category.name;
            if (menu[categoryName] === undefined){
                errorMessages = {...errorMessages, [categoryName]: `Veuillez choisir votre ${categoryName}`};
                isError = true;
            }
        })       
        setError(errorMessages);
        return isError;
    };


    const handleSubmit = async () => {
        const isError = await verifyForm();        
        const d = new Date();
        const hour = d.getHours();
        const day = d.getDay();
        if(!isError && !isNoSideSelected){
            //If the user is trying to order a menu at the wrong time (correct time : monday to friday, 11h to 14h)
            if (day > 5) {
                alert("Nous sommes désolés, il n'est pas possible de commander un menu le week-end.");
            }
            else if (hour < 11 || hour > 13) {
                alert("Nous sommes désolés, il n'est possible de commander un menu qu'entre 11h et 14h.");
            }
            else {
                dispatch(addAlert({ nom: menuChosen.name, id: uuidv4() }));
                setQuantite(1);
                const name = menuChosen.name;
                dispatch(
                  addMenu({'prix': totalPrice, quantite, 'nom': name, 'produits': {...menu, 'accompagnement': sideDishChosen}, 'type': 'menu'})
                );
                setSideDishChosen(null);
            }           
        }
        else {
            console.log('invalide')
        }
    }  


    const findCategoryId = (categoryName) => {
        for (var i = 0; i < menuCategories.length; i++) {
            if ( menuCategories[i].nom === categoryName) {
                return  menuCategories[i].id;
            }
        }
    }


    const selectDishesPerCategory = (category) => {
        const selectedDishes = datas
        // We filter the data :
        .filter((data) => {
            // By only selecting the data that belongs to a category (categories is an array in which are the different categories to which a dish belongs) that matches the one selected by the user (var active)
            return (
                data.categorie === category
            )
        })
        //Once filtered, we can go through the selection to display them
        .map((data) => {
            return <CardMenu 
                key={data.id} 
                {...data} 
                categoryId={category} 
                sideDishChosen={sideDishChosen}
                setSideDishChosen={setSideDishChosen}
                error={errorSideDish}
                setError={setErrorSideDish}      
                setNoSidesSelected={setNoSidesSelected}   
                setPrixSupplement={setPrixSupplement}   
                prixSupplement={prixSupplement}
            />;
        });
        return selectedDishes;
    };


  return (
    <div className='menu__order' id='menu__order'> 
        <div className="menu__header">
            <h2>{menuChosen.name}</h2>
            <img src={menuChosen.img} alt="plat" className="menu__header-img"/>
            <p className="menu__prix">{menuChosen.prix}</p>
            <p className="menu__instuctions">
                Veuillez composer votre menu en choisissant {menuChosen.text}
            </p>
            <p className="menu__price-info">
                {menuChosen.price}€
            </p>
        </div>

        <div className="menu__items-container">
            {menuChosen.categories.map(category => (
                <div className="menu__category-container" key={category['name']}>
                    <h3>Votre {category['name']}</h3>                
                    <div className="commander__container__cards">
                    
                        <FormControl component="fieldset">
                        <RadioGroup 
                            aria-label={category['name']} 
                            name={category['name']} 
                            value={menu.category} 
                            onChange={handleChange}                            
                            className="dishes-menu__radio-container"
                        >
                            {selectDishesPerCategory(findCategoryId(category['id']))}  
                        </RadioGroup>  
                        </FormControl>   
                        <p className="error">{error[category['name']]}</p>               
                    </div>
                </div>
            ))}
            {isNoSideSelected && (<p className="error">Le plat sélectionné nécessite un accompagnement, veuillez en choisir un</p>)}
        </div>

        <div className="cart__menu-container">
            <div
                className="button__menu-cart"
                style={{
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
                }}>
                <IconButton
                style={{ margin: "0 5px" }}
                onClick={() => {
                    if (quantite > 0) {
                    setQuantite(quantite - 1);
                    }
                }}>
                <RemoveIcon />
                </IconButton>

                <span>{quantite}</span>

                <IconButton
                style={{ margin: "0 5px" }}
                onClick={() => setQuantite(quantite + 1)}>
                <AddIcon />
                </IconButton>
            </div>
            
            <div className="cart__add-menu">
                <h3>{`Total (TTC): ${(quantite * totalPrice).toFixed(2)}`}€</h3>
                <Button          
                    onClick={() => {
                        handleSubmit();
                    }}      
                    variant='contained'
                    color='secondary'
                    className='card__item__commander-btn'
                    endIcon={<AddShoppingCartIcon style={{ fontSize: "25px" }} />}>
                    Ajouter au panier
                </Button>
            </div>
        </div>
    </div>
  );
};

export default Menu;