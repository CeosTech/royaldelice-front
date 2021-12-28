import React from "react";
import "./product.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import {
  incrementQauntite,
  decrementQauntite,
  deleteProduct,
} from "../../app/Redux-slices/basketsSlice";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { splitPrix, calculTotalSupplements } from "../../utilities";
import Grid from '@material-ui/core/Grid';

const Products = ({
  image,
  nom,
  prix,
  id,
  quantite,
  categorie,
  prixTotal,
  nom_categorie, // à modif
  boissonSelected,
  garnitureSelected, // tab
  painSelected,
  viande_1_selected,
  viande_2_selected,
  viande_3_selected,
  sauceSelected, // tab
  supplementSelected, // tab
  information,
}) => {
  const dispatch = useDispatch();
  //console.log(viande_2_selected.length);
  //console.log(viande_3_selected.length);
  return (
    <div className="product">
      <Grid container justifyContent="center"> 
        <Grid container xs={3}>
          <div className="product-img">
            <img src={image} alt='title'></img>
          </div>
        </Grid>
        <Grid container xs={8}>
        <div className="product-list">
        <p className="product--info-title">
          <Grid container direction="row" style={{fontWeight: "bold"}}>
            <Grid xs={12} md={6}>
                {nom}
            </Grid>
            <Grid xs={12} md={6}>
              <p>
            <span className="product-quantite">
              <IconButton
                className="btn-remove"
                onClick={() => {
                  if (quantite > 0) {
                    dispatch(decrementQauntite({ nom }));
                  }
                }}
                
              >
                <RemoveIcon />
              </IconButton>

              <span className="text-quantite">{quantite}</span>

              <IconButton className="btn-add" onClick={() => dispatch(incrementQauntite({ nom }))}>
                <AddIcon />
              </IconButton>

              
            </span>

            <span className="delete__product">
              <IconButton onClick={() => dispatch(deleteProduct({ nom }))}>
                <DeleteIcon />
              </IconButton>
              
              </span>
           </p>
            </Grid>
          </Grid>
           
            
        </p>
        {nom_categorie && (
          <p className="menu__details-title">{nom_categorie}</p>
        )}

        <>
          {painSelected && (
            <>
              <p className="menu__details-title">Pain</p>
              <p className="menu__details">{painSelected}</p>
            </>
          )}

          {viande_1_selected && (
            <>
              <p className="menu__details-title">1 Viande</p>
              <p className="menu__details">{viande_1_selected}</p>
            </>
          )}

          {viande_2_selected.length === 0 ? ("") : (
            <>
              <p className="menu__details-title">2 Viandes</p>
              {viande_2_selected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {item}
                  </p>
                 );
              })}
            </>
          )}
          {viande_3_selected.length === 0 ? ("") : (
            <>
              <p className="menu__details-title">3 Viandes</p>
              {viande_3_selected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {item}
                  </p>
                 );
              })}
            </>
          )}

          {garnitureSelected.length === 0 ? ("") : (
            <>
              <p className="menu__details-title">Garniture</p>
              {garnitureSelected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {item}
                  </p>
                );
              })}
            </>
          )}

          {sauceSelected.length === 0 ? ("") : (
            <>
              <p className="menu__details-title">Sauce</p>
              {sauceSelected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {item}
                  </p>
                );
              })}
            </>
          )}

          {supplementSelected.length === 0 ? ("") : (
            <>
              <p className="menu__details-title">
                Supplément {calculTotalSupplements(supplementSelected)}€
              </p>
              {supplementSelected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {JSON.parse(item).nom_supplement}{" "}
                    {parseFloat(JSON.parse(item).prix_supplement).toFixed(2)}€
                  </p>
                );
              })}
            </>
          )}


          {boissonSelected && (
            <>
              <p className="menu__details-title">Boisson</p>
              <p className="menu__details">{boissonSelected}</p>
            </>
          )}
          {information && (
            <>
              <p className="menu__details-title">information</p>
              <p className="menu__details">
                <i>{information}</i>
              </p>
            </>
          )}
        </>
      </div>

        </Grid>
        <Grid container xs={1} justifyContent="flex-end">
        <div className="product__prix">
      <p className="product--info-prix">{splitPrix(prixTotal * quantite)}</p>
      </div>
        </Grid>
      </Grid>
     
      
     

      
    </div>
  );
};

export default Products;
