import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import "./productDisplay.css";
import { splitPrix } from "../../../utilities";

const ProductDisplay = ({ idPanierItem }) => {
  const [panierItem, setPanierItem] = useState(null);
  const [supplements, setSupplements] = useState(null);
  const [supplementsPayants, setSupplementsPayants] = useState([]);

  const fetchPanierItem = async () => {
    const { data } = await axios.get(URL + "paiement/produits/" + idPanierItem);
    setPanierItem(data);
    const supplementTemp = JSON.parse(data.supplements);

    setSupplements(supplementTemp);
    const supplementsPayantsTemp = [];
    // if (supplementTemp?.supplements) {
    supplementTemp?.supplements?.forEach((suppemntItem) => {
      supplementsPayantsTemp.push(JSON.parse(suppemntItem));
    });
    // }
    setSupplementsPayants(supplementsPayantsTemp);
  };

  useEffect(() => {
    fetchPanierItem();
  }, []);

  useEffect(() => {
    console.log(`panierItem`, panierItem);
  }, [panierItem]);
  return (
    <div>
      {panierItem ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="title-details">
              {panierItem.quantite}x {panierItem.produit?.nom}{""}
            </p>
            <span class="spacing">{panierItem.produit?.prix + "€"}<br /></span>

            {/* tester si c'est pizza, car sa structure est differente des autres*/}
            {/* {panierItem?.categorie === 100 ? (
              <p>
                {supplements?.prixPizzaSelected &&
                  splitPrix(
                    supplements.prixPizzaSelected * panierItem.quantite
                  )}
              </p>
            ) : (
              <p>{splitPrix(panierItem.produit?.prix * panierItem.quantite)}</p>
            )} */}
          </div>

          {supplements?.viande_1_selected && (
            <>
              <p><span className="bold-details">Viande :</span> <span>{supplements.viande_1_selected}</span></p>
            </>
          )}

          {supplements?.viande_2_selected?.length > 0 && (
            <>
              <p><span className="bold-details">Viandes</span> : {supplements.viande_2_selected.map((viandeItem) => (
              <span  class="spacing"><br />{viandeItem}</span>
        
          ))}</p>
            </>
          )}

          {supplements?.viande_3_selected?.length > 0 && (
            <>
              <p>
                <span className="bold-details">Viandes :</span>
                {supplements.viande_3_selected.map((viandeItem) => (
                  <span class="spacing"><br />{viandeItem}</span>
                ))}
              </p>
            </>
          )}

          {/* {supplements?.viande_1_selected && (
            <>
              <p className="bold-details">Viande 1 : </p>
              <p>{supplements.viande_1_selected}</p>
            </>
          )}

          {supplements?.viande_2_selected && (
            <>
              <p className="bold-details">Viande 2 : </p>
              {supplements.viande_2_selected}
              <p>{supplements.viande_2_selected}</p>
            </>
          )}

          {supplements?.viande_3_selected && (
            <>
              <p className="bold-details">
                Viande 3 : {supplements.viande_3_selected}
              </p>
              <p>{supplements.viande_3_selected}</p>
            </>
          )} */}
          {supplements&& supplements.hasOwnProperty("pain") && supplements.pain !== null &&(
            <>
              <p>  <span className="bold-details">Pain : </span> {supplements.pain}</p>
            </>
          )}

          {/* =========== SAUCE ================== */}
          {supplements?.sauce?.length !== 0 &&
            <p>  <span className="bold-details" > Sauces : </span><br />{supplements?.sauce?.map((sauceItem) => (
              <span class="spacing">{sauceItem}<br /></span>
          

            ))}
            </p>}
          
          {supplements?.hasOwnProperty("garniture") &&
            supplements?.garniture?.length !== 0 && 
              <p> <span className="bold-details"> Garnitures : </span><br />{supplements?.garniture?.map((garnitureItem) => (
                <span class="spacing">{garnitureItem}<br /></span>
             ))}
            </p>}

          {/* =========== SUPPLEMENT PAYANT ================== */}
          {supplementsPayants?.length !== 0 && (
            <p className="bold-details">Suppléments :</p>
          )}
          {supplementsPayants?.map((supplementsPayantsItem) => (
            <div key={supplementsPayantsItem} className="ecarter-prix">
              <p>{panierItem.quantite}x{supplementsPayantsItem.nom_supplement}</p>
              <p>{supplementsPayantsItem.prix_supplement}€</p>
            </div>
          ))}

          {supplements?.boisson && (
            <>
              <p>
                {" "}
                <span className="bold-details">Boisson : </span>{" "}
                {supplements.boisson}
              </p>
              {/* <p>{supplements.boisson}</p>  */}
            </>
          )}
          {panierItem?.information && (
            <>
              <p className="bold-details">Information :</p>
              <p>{panierItem.information}</p>
            </>
          )}
        </div>
      ) : (
        <p>Erreur, panier pas reçu</p>
      )}
    </div>
  );
};

export default ProductDisplay;

