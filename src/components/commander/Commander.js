import { useEffect, useState } from "react";

import Carte from "../Carte";
import MenuType from "../Menu/MenuType";
import Card from "../Carte/card";


import "./Commander.css";

import { sendrequest } from "../middlewares/request";

import { IconButton } from "@material-ui/core";

const Commander = () => {
  const [active, setActive] = useState(1);
  const [activeCarte, setActiveCarte] = useState(true);
  const [datas, setDatas] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);  
  const [boissonFamily, setBoissonFamily] = useState([]);
  const [choixPain, setChoixPain] = useState([]);
  const [choixGarniture, setChoixGarniture] = useState([]);
  const [choixViande, setChoixViande] = useState([]);
  const [choixSupplement, setChoixSupplement] = useState([]);
  const [choixSupplementPizza, setChoixSupplementPizza] = useState([]);
  const [choixSupplementSucree, setChoixSupplementSucree] = useState([]);
  const [choixSupplementFruits, setChoixSupplementFruits] = useState([]);
  const [choixSupplementFrites, setChoixSupplementFrites] = useState([]);
  const [choixSupplementViande, setChoixSupplementViande] = useState([]);
  const [choixSupplementViande_2, setChoixSupplementViande_2] = useState([]);

  const [choixSupplementSal, setChoixSupplementSal] = useState([]);
  const [choixSauce, setChoixSauce] = useState([]);
  const [choixTaille, setChoixTaille] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [dishesDisplayed, setDishesDisplay] = useState(false);

  // Booleans that will only allow the component to render when the requests have returned the datas
  const [isDataLoading, setDataLoading] = useState(false);
  const [isCategoryLoading, setCategoryLoading] = useState(false);
  const [sideDishesLoading, setSideDishesLoading] = useState(false);
  // activeCarte && (window.document.body.style.overflow = "hidden")

  activeCarte
    ? (window.document.body.style.overflow = "hidden")
    : (window.document.body.style.overflow = "auto");

  const fetchData = async () => {
    sendrequest("get", "produit/", setDatas, setDataLoading);
    sendrequest(
      "get",
      "categorie/?ordering=id",
      setMenuCategories,
      setCategoryLoading
    );
    sendrequest(
      "get",
      "supplement/?type_supplement=Boisson",
      setSideDishes
    ); // categorie correspondant aux boissons
    sendrequest(
      "get",
      "supplement/?sup_family=true",
      setBoissonFamily
    ); // categorie correspondant aux boissons
    sendrequest(
      "get",
      "ingredient/?type_ingredient=Pain",
      setChoixPain
    ); // categorie correspondant au pain
    sendrequest(
      "get",
      "ingredient/?type_ingredient=Crudite",
      setChoixGarniture
    ); // categorie correspondant à la garniture
    sendrequest(
      "get",
      "supplement/?sup_burgers_sandwichs_assiettes=true",
      setChoixSupplement
    ); // categorie correspondant à tous les supplements
    sendrequest(
      "get",
      "ingredient/?type_ingredient=Sauce",
      setChoixSauce
    ); // categorie correspondant à la sauce
    sendrequest(
      "get",
      "supplement/?type_supplement=TaillePizza",
      setChoixTaille
    ); // categorie correspondant à la taille de la pizza
    sendrequest(
      "get",
      "supplement/?sup_pizzas=true",
      setChoixSupplementPizza
    ); // categorie correspondant aux supplements salees
    sendrequest(
      "get",
      "supplement/?sup_milshake_crepe=true",
      setChoixSupplementSucree
    ); // categorie correspondant aux supplements sucrees
    sendrequest(
      "get",
      "supplement/?sup_smoothie=true",
      setChoixSupplementFruits
    ); // categorie correspondant aux supplements fruits
    sendrequest(
      "get",
      "supplement/?sup_sur_frite=true",
      setChoixSupplementFrites
    ); // categorie correspondant aux supplements frites
    sendrequest(
      "get",
      "supplement/?sup_salade=true",
      setChoixSupplementSal
    ); // categorie correspondant aux supplements frites
    sendrequest(
      "get",
      "ingredient/?type_ingredient=Viande",
      setChoixViande
    ); // categorie correspondant aux ingredients viandes
    sendrequest(
      "get",
      "ingredient/?type_ingredient=Viande",
      setChoixSupplementViande
    ); // categorie correspondant aux ingredients viandes
    sendrequest(
      "get",
      "ingredient/?type_ingredient=Viande",
      setChoixSupplementViande_2
    ); // categorie correspondant aux ingredients viandes
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Function that will check through if id of the selected menu item matches the one of 'Menu'. If so then we will want to display all of the datas, not just a selection.
  const isMenu = () => {
    for (var i = 0; i < menuCategories.length; i++) {
      if (
        menuCategories[i].id === active &&
        menuCategories[i].nom === "Menus du Midi"
      ) {
        return datas;
      }
    }
  };

  const selectDishesPerCategory = () => {
    var menuDishes = isMenu();

    if (menuDishes !== undefined) {
      return (
        <MenuType
          datas={datas}
          menuCategories={menuCategories}
          dishesDisplayed={dishesDisplayed}
          setDishesDisplay={setDishesDisplay}
        />
      );
    } else {
      const selectedDishes = datas
        // We filter the data :
        .filter((data) => {
          // By only selecting the data that belongs to a category (categories is an array in which are the different categories to which a dish belongs) that matches the one selected by the user (var active)
          return data.categorie === active;

          /*for (var i = 0; i < data.categories.length; i++) {
            if (data.categories[i] === active) return true;
            return false;
          }*/
        })
        //Once filtered, we can go through the selection to display them
        .map((data) => {
            return (
              <Card
                key={data.id}
                {...data}
                data = {data}

                sideDishes={sideDishes} //Boissons
                setSideDishes={setSideDishes} //Boissons

                boissonFamily={boissonFamily} //Boissons
                setBoissonFamily={setBoissonFamily} //Boissons

                choixPain={choixPain}
                setChoixPain={setChoixPain}

                choixGarniture={choixGarniture}
                setChoixGarniture={setChoixGarniture}

                choixSauce={choixSauce}
                setChoixSauce={setChoixSauce}

                choixViande={choixViande}
                setChoixViande={setChoixViande}

                choixSupplementViande={choixSupplementViande} // ?
                setChoixSupplementViande={setChoixSupplementViande}// ?

                choixSupplementViande_2={choixSupplementViande_2}// ?
                setChoixSupplementViande_2={setChoixSupplementViande_2}// ?

                choixSupplement={choixSupplement}
                setChoixSupplement={setChoixSupplement}

                choixSupplementSucree={choixSupplementSucree}
                setChoixSupplementSucree={setChoixSupplementSucree}

                choixSupplementFruits={choixSupplementFruits}
                setChoixSupplementFruits={setChoixSupplementFruits}

                choixSupplementFrites={choixSupplementFrites}
                setChoixSupplementFrites={setChoixSupplementFrites}

                choixSupplementSal={choixSupplementSal}
                setChoixSupplementSal={setChoixSupplementSal}

                choixTaille={choixTaille}
                setChoixTaille={setChoixTaille}

                choixSupplementPizza={choixSupplementPizza}
                setChoixSupplementPizza={setChoixSupplementPizza}

              />
            );

          
        });
      return selectedDishes;
    }
  };

  return (
    <div className="commander">
      {/* Loading spining circle displayed */}
      {!isDataLoading && <div className="lds-dual-ring"></div>}

      <div className="commander__container">
        {isCategoryLoading && (
          <Carte
            active={active}
            setActive={setActive}
            activeCarte={activeCarte}
            setActiveCarte={setActiveCarte}
            categories={menuCategories}
            setDishesDisplay={setDishesDisplay}
          />
        )}

        {isDataLoading && (
          <>
            <div className="commander__container__cards">
              {selectDishesPerCategory()}
            </div>

            {/*<div
              className={"commander__carte " + (activeCarte ? "white" : null)}
            >
              <IconButton onClick={() => setActiveCarte(() => !activeCarte)}>
                <i
                  className={"fas fa-arrow-" + (activeCarte ? "left" : "right")}
                ></i>
              </IconButton>
            </div>*/}
          </>
        )}
      </div>
    </div>
  );
};

export default Commander;
