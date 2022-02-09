import { useEffect, useState } from "react";

import Carte from "../Carte";
import MenuType from "../Menu/MenuType";
import Card from "../Carte/card";


import "./Commander.css";

import { sendrequest } from "../middlewares/request";

import { IconButton } from "@material-ui/core";

const Commander = () => {
  const [active, setActive] = useState(18);
  const [activeCarte, setActiveCarte] = useState(true);
  const [datas, setDatas] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);
  const [boissonFamily, setBoissonFamily] = useState([]);
  const [choixPain, setChoixPain] = useState([]);
  const [choixGarniture, setChoixGarniture] = useState([]);
  const [choixViande, setChoixViande] = useState([]);
  const [choixSupplement, setChoixSupplement] = useState([]);
  const [choixSupplementViande, setChoixSupplementPizza] = useState([]);

  const [choixSupplementSal, setChoixSupplementSal] = useState([]);
  const [choixSauce, setChoixSauce] = useState([]);
  const [choixTaille, setChoixTaille] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [dishesDisplayed, setDishesDisplay] = useState(false);

  // Booleans that will only allow the component to render when the requests have returned the datas
  const [isDataLoading, setDataLoading] = useState(false);
  const [isCategoryLoading, setCategoryLoading] = useState(false);

  // LISTES DES ELEMENTS DANS LA BOX
  const [painByCategory, setPainByCategory] = useState([]);
  const [supplementByCategory, setSupplementByCategory] = useState([]);
  const [garnitureByCategory, setGarnitureByCategory] = useState([]);
  const [sauceByCategory, setSauceByCategory] = useState([]);
  const [viandeByCategory, setViandeByCategory] = useState([]);
  const [boissonByCategory, setBoissonByCategory] = useState([]);
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

    /* =============== INGREDIENT ========================== */
    // take the ingredient for the follow category or else take the ingredient for the active category
    if ([1, 7, 8, 18, 20, 23, 24, 25, 27].includes(active)) {// GARNITURE
      sendrequest(
        "get",
        "ingredient/?categorie=" + 25 + "&typeIngredient=4",
        setGarnitureByCategory
      ); // categorie correspondant aux garniture
    }else{
      sendrequest(
        "get",
        "ingredient/?categorie=" + active + "&typeIngredient=4",
        setGarnitureByCategory
      ); // categorie correspondant aux garniture
    }
    if ([1, 7, 8, 18, 19, 20, 21, 23, 24, 25, 26, 27, 22, 29].includes(active)) {// SAUCE
      sendrequest(
        "get",
        "ingredient/?categorie=" + 25 + "&typeIngredient=5",
        setSauceByCategory
      ); // categorie correspondant aux sauces
    }else{
      sendrequest(
        "get",
        "ingredient/?categorie=" + active + "&typeIngredient=5",
        setSauceByCategory
      ); // categorie correspondant aux sauces
    }
    if ([16, 25, 27].includes(active)) { // VIANDE
      sendrequest(
        "get",
        "ingredient/?categorie=" + 25 + "&typeIngredient=2",
        setViandeByCategory
      ); // categorie correspondant aux viandes
    }else{
      sendrequest(
        "get",
        "ingredient/?categorie=" + active + "&typeIngredient=2",
        setViandeByCategory
      ); // categorie correspondant aux viandes
    }
    if( [18, 23].includes(active)){ // PAIN
      console.log("PAIN")
      sendrequest(
        "get",
        "ingredient/?categorie=" + 18 + "&typeIngredient=1",
        setPainByCategory
      ); // categorie correspondant aux pains
    }else{
      sendrequest(
        "get",
        "ingredient/?categorie=" + active + "&typeIngredient=1",
        setPainByCategory
      ); // categorie correspondant aux pains
    }
    if ([9, 19, 20, 21].includes(active)) { // BOISSONS
      sendrequest(
        "get",
        "ingredient/?categorie=" + 18 + "&typeIngredient=6",
        setBoissonByCategory
      ); // categorie correspondant aux boissons
    }else{
      sendrequest(
        "get",
        "ingredient/?categorie=" + active + "&typeIngredient=6",
        setBoissonByCategory
      ); // categorie correspondant aux boissons
    }

    /* ============= SUPPLEMENT ================== */
    if ([18, 23, 26, 27].includes(active)) {// Supplément
      sendrequest(
        "get",
        "supplement/?categorie=" + 20,
        setSupplementByCategory
      ); // categorie correspondant aux suppléments
    }else{
      sendrequest(
        "get",
        "supplement/?categorie=" + active,
        setSupplementByCategory
      ); // categorie correspondant aux suppléments
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(active)
    fetchData();
  }, [active, activeCarte, setActive])

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
        .sort((a, b) => a.id - b.id)
        //Once filtered, we can go through the selection to display them
        .map((data) => {
          return (
            <Card
              key={data.id}
              {...data}
              data={data}

              sideDishes={sideDishes} //Boissons
              setSideDishes={setSideDishes} //Boissons

              boissonFamily={boissonFamily} //Boissons
              setBoissonFamily={setBoissonFamily} //Boissons

              painByCategory={painByCategory}

              garnitureByCategory={garnitureByCategory}

              supplementByCategory={supplementByCategory}

              sauceByCategory={sauceByCategory}
              choixSauce={choixSauce}
              setChoixSauce={setChoixSauce}

              viandeByCategory={viandeByCategory}
              choixViande={choixViande}
              setChoixViande={setChoixViande}

              boissonByCategory={boissonByCategory}

              choixTaille={choixTaille}
              setChoixTaille={setChoixTaille}

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
