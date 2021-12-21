import { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Carte from "./Carte";
import CartePage from './CartePage';
//import MenuType from "../../Menu/MenuType";
//import Card from "./Carte/card";
import AddProductModal from "./MyModal/AddProductModal";
import "./index.css";
import axios from "axios";
import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { URL, sendrequest } from "../../../middlewares/request";
import SwitchBtn from "../switch/SwitchBtn";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";



const proprietes = ["Vos produits", "Disponibilité"];

const useStyles = makeStyles({
  heading: {
    width: "100%",
    fontWeight: "bold",
    textAlign: "left",
    
  },

  content: {
    fontWeight: "bold",
    fontSize: 30,
  },

  rowConfig: {
    borderWidth: 3,
  },
});

export default function GestionProduits () {
    const classes = useStyles();
    const [active, setActive] = useState(1);
    const [activeCarte, setActiveCarte] = useState(true);
    const [datas, setDatas] = useState([]);
    const [sideDishes, setSideDishes] = useState([]);
    const [menuCategories, setMenuCategories] = useState([]);
    const [dishesDisplayed, setDishesDisplay] = useState(false);
    // Booleans that will only allow the component to render when the requests have returned the datas
    const [isDataLoading, setDataLoading] = useState(false);
    const [isCategoryLoading, setCategoryLoading] = useState(false);
    const [sideDishesLoading, setSideDishesLoading] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [show, setShow] = useState(false);
    const [produit, setProduit] = useState([]);
    // activeCarte && (window.document.body.style.overflow = "hidden")
    activeCarte
        ? (window.document.body.style.overflow = "hidden")
        : (window.document.body.style.overflow = "auto");


    const fetchData = async () => {
        
        //sendrequest("get", "letexan/produit/?accompagnement=true", setSideDishes, setSideDishesLoading);
        axios.get(URL + "restaurant/produit/").then((res) => {
          setDatas(res.data);
          console.log(res.data);
        });
   

        axios.get(URL + "restaurant/categorie/").then((res) => {
          setMenuCategories(res.data);
          console.log(res.data);
        });
    };


    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (data) =>{
       
        setProduit(data);
        while(produit === []){
            //console.log(test);
        }
        console.log("TEST1");
        console.log(produit);
        setShow(true);

    }

    const updateDisponibilite = async (id, disponibilite) => {
        await axios.put(URL + "restaurant/produit/" + id +"/", {
            disponibilite: disponibilite,
        });
    };

    /*//Function that will check through if id of the selected menu item matches the one of 'Menu'. If so then we will want to display all of the datas, not just a selection.
    const isMenu = () => {
        for (var i = 0; i < menuCategories.length; i++) {
            if (menuCategories[i].id === active && menuCategories[i].nom === "Menus du Midi") {
                return datas;
            }
        }
    };*/

    const selectDishesPerCategory = () => {
        //var menuDishes = isMenu();

        if (1 !== 1) {
            
        } else {
            const selectedDishes = datas
                // We filter the data :
                .filter((data) => {
                    console.log(data);
                    // By only selecting the data that belongs to a category (categories is an array in which are the different categories to which a dish belongs) that matches the one selected by the user (var active)
                    return (
                        data.categorie === active
                    )


                    /*for (var i = 0; i < data.categories.length; i++) {
                      if (data.categories[i] === active) return true;
                      return false;
                    }*/
                })
                //Once filtered, we can go through the selection to display them
                .map((data) => {
                    return (
                        <>
                            <div 
                                style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid rgba(224, 224, 224, 1)"}} 
                            >
                                <div 
                                    style={{width: "100%", margin: 0}} 
                                    onClick={() => openModal(data)}>
                                    <CartePage 
                                        key={data.categorie} 
                                        idMenuPage={data.categorie}
                                        produit={data}
                                        show={show} 
                                        setShow={setShow} 
                                    />
                                    </div>
                                    <div style={{paddingTop: "60px", marginRight: "5%"}}>
                                        <SwitchBtn
                                        val={data.disponibilite}
                                        action={updateDisponibilite}
                                        item={data}
                                        />
                                    </div>
                            </div>

                            <AddProductModal 
                                {...produit} 
                                productToUpdate={produit} 
                                categorieId={active} 
                                show={show} 
                                setShow={setShow} ></AddProductModal>

                            
                        </>
                    );
                });
            return selectedDishes;
        }
    };

    return (
        <div className='commander__'>
            <div style={{ textAlign: 'center', width: "100%" }}>
            
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    size="small"
                    value={active}
                    onChange={(e)=>{
                        setActive(e.target.value);
                        setActiveCarte(false);
                        setDishesDisplay(false);
                    }}
                    >
                        {menuCategories.map(categorie=>{
                            return <MenuItem value={categorie.id}>{categorie.nom}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            
                <Button id="ajouter_produit" onClick={() => setShowProductModal(true)} > Ajouter Produit</Button>
                <AddProductModal categorieId={active} show={showProductModal} setShow={setShowProductModal} ></AddProductModal>
            </div>

            {proprietes.map((prop) => (
                  <TableCell key={prop} className={classes.heading} align='center'>
                    {prop}
                  </TableCell>
            ))}

            <div className='commander__container'>
            
                    <>
                        

                        <div className='commander__container__cards'>
                            {selectDishesPerCategory()}
                        </div>

                       
                    </>
      
            </div>
        </div>
    );
};

