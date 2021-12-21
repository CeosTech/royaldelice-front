import React, {useState, useEffect} from 'react'
import './styles.css';
import axios from "axios";
import { URL, sendrequest } from "../../../../middlewares/request";
//import { CarteContent } from '../../../../data/site/carteContent';
import Grid from '@material-ui/core/Grid';
import ShowMoreText from "react-show-more-text";
import { Button, IconButton, TextField } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
//import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { splitPrix } from "../../../../utilities";
import AddProductModal from "../MyModal/AddProductModal";
import Modal from "../MyModal/Modal";
//import RemoveIcon from "@material-ui/icons/Remove";
//import AddIcon from "@material-ui/icons/Add";


const CartePage = (props) => {
  const idMenu = props.idMenuPage;
  const [produit, setProduit] = useState(props.produit);
  //const [show, setShow] = useState(false);


    /*const fetchProduit = () => {
      
        setProduit(props.produit);

    };

    useEffect(() => {
      fetchProduit();
      console.log(produit);
    }, []);*/


    const showMultiplePrice = (data) => {

      if(data?.categorie === 1 && data?.prix === 0){
        return (<p><b>{"À partir de " + data?.prix_gourmande + " €"} </b> </p>)
      }
      else if(data?.categorie === 2 && data?.prix === 0){
        return (<p><b>{"À partir de " + data?.pieces_x5 + " €"} </b> </p>)
      }
      else if(data?.categorie === 4 && data?.prix === 0){
        return (<p><b>{"À partir de " + data?.sans_accompagnement + " €"} </b> </p>)
      }
      else if(data?.categorie === 12 && data?.prix === 0){
        return (<p><b>{"À partir de " + data?.moyen + " €"} </b> </p>)
      }
      else{
        return (<p><b>{data?.prix + " €"} </b> </p>)
      }
    }

    return(
      <>
        <div id="menu-page" style={{paddingLeft: "300%"}}>
                            <div 
                              className="menu-item"
                              style={{width: "110%", textAlign: "left"}}
                              
                            >
                              <Grid container direction="row" >
                                <Grid container alignItems="center" justifyContent="center" direction="column"  xs={4}>
                                    <img className="menu-board-img" src={produit?.image} alt={produit?.nom}></img>
                                </Grid>
                                <Grid container justifyContent="center" alignItems="flex-start" direction="column" xs={8}>
                                  <div 
                                    className="menu-item-info"
                                    style={{textAlign: "left"}}
                                  >
                                    <p className="menu-item-titre" style={{paddingTop: "10px"}}
                                    >{produit?.nom}</p>
                                    <ShowMoreText
                                        /* Default options */
                                        lines={1}
                                        more=""
                                        less=""
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        /*onClick={this.executeOnClick}*/
                                        expanded={false}
                                        width={280}
                                        truncatedEndingComponent={"... "}
                                        className="menu-item-text"
                                    >
                                        {produit?.description}
                                    </ShowMoreText>
                                  {/* Produit à prix multiple => Formules / Entrées / Rotisserie / Soft drinks */}
                                    {showMultiplePrice(produit)}
                                  </div>
                                  
                                </Grid>
                            
                              </Grid>

                                


                            </div>


                    

        </div>


      </>
    );
};
 export default CartePage;
