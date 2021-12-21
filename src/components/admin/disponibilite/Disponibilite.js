import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBox from "../../table/Table";
import {URL} from "../../middlewares/request";

const proprietes = ["Nom", "Disponibilité"];

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginTop: "6rem",
    marginBottom: "2rem",
    color: "rgb(86 85 85)",
  },



});

const Disponibilite = () => {
  const styles = useStyles();
  const [menusSandwichs, setMenusSandwichs] = useState([]);
  const [menusSandwichsFour, setMenusSandwichsFour] = useState([]);
  const [menusBurgers, setMenusBurgers] = useState([]);
  const [menusBurgersDuo, setMenusBurgersDuo] = useState([]);
  const [menusTacos, setMenusTacos] = useState([]);
  const [menusPaninis, setMenusPaninis] = useState([]);
  const [menusCroq, setMenusCroq] = useState([]);
  const [menusFamily,setMenusFamily] = useState([]);
  const [menusEnfants,setMenusEnfants] = useState([]);
  const [pizzaSauceTomate, setPizzaSauceTomate] = useState([]);
  const [pizzaCremeFraiche, setPizzaCremeFraiche] = useState([]);
  const [pizzaSauceSpeciale, setPizzaSauceSpeciale] = useState([]);
  const [sandwichs, setSandwichs] = useState([]);
  const [burgers, setBurgers] = useState([]);
  const [paninis, setPaninis] = useState([]);
  const [croq, setCroq] = useState([]);
  const [salades, setSalades] = useState([]);
  const [accompagnements, setAccompagnements] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [milkshakes, setMilkshakes] = useState([]);
  const [smoothies, setSmoothies] = useState([]);
  const [boissons, setBoissons] = useState([]);

  const get_menusSandwichs = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=1"
    );
    setMenusSandwichs(data);
  };

  const get_menusSandwichsFour = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=2"
    );
    setMenusSandwichsFour(data);
  };

  const get_menusBurgers = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=3"
    );
    setMenusBurgers(data);
  };
  const get_menusBurgersDuo = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=4"
    );
    setMenusBurgersDuo(data);
  };
  const get_menusTacos = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=5"
    );
    setMenusTacos(data);
  };
  const get_menusPaninis = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=6"
    );
    setMenusPaninis(data);
  };
  const get_menusFamily = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=7"
    );
    setMenusFamily(data);
  };
  const get_menusEnfants = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=8"
    );
    setMenusEnfants(data);
  };

  const get_pizzaSauceTomate = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=9"
    );
    setPizzaSauceTomate(data);
  };
  const get_pizzaCremeFraiche = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=10"
    );
    setPizzaCremeFraiche(data);
  };
  const get_pizzaSauceSpeciale = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=11"
    );
    setPizzaSauceSpeciale(data);
  };
   const get_accompagnements = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=15"
    );
    setAccompagnements(data);
  }; 

  
  const get_burgers = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=12"
    );
    setBurgers(data);
  }; 
  const get_paninis = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=13"
    );
    setPaninis(data);
  };

  const get_croq = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=14"
    );
    setCroq(data);
  };
  

  const get_salades = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=16"
    );
    setSalades(data);
  };

  const get_desserts = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=19"
    );
    setDesserts(data);
  };
  const get_milkshakes = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=18"
    );
    setMilkshakes(data);
  };
  const get_smoothies = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=17"
    );
    setSmoothies(data);
  };
  const get_boissons = async () => {
    const { data } = await axios.get(
      URL + "produit/?categorie=20"
    );
    setBoissons(data);
  };
  

  const updateDisponibilite = async (id, disponibilite) => {
    await axios.put(URL + "disponibilitePlats/", {
        id,
        disponibilite,
    });
  };

  useEffect(() => {
    get_menusSandwichs();
    get_menusSandwichsFour();
    get_menusBurgers();
    get_menusBurgersDuo();
    get_menusTacos();
    get_menusFamily();
    get_menusEnfants();
    get_menusPaninis();
    get_pizzaSauceTomate();
    get_pizzaCremeFraiche();
    get_pizzaSauceSpeciale();
    get_accompagnements();
    get_burgers();
    get_paninis();
    get_croq();
    get_salades();
    get_desserts();
    get_milkshakes();
    get_smoothies();
    get_boissons();


  }, []);

  return (
    <div >
        <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "rgb(86 85 85)",
        }}>
        Menus Sandwichs
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusSandwichs}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Menus Sandwichs au four
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusSandwichsFour}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Menus Burgers
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusBurgers}
        action={updateDisponibilite}
      />
      <h1
        className={styles.title}>
        Menus Burgers Duo
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusBurgersDuo}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Menus Tacos
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusTacos}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Menus Paninis/Croq
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusPaninis}
        action={updateDisponibilite}
      />
           <h1
        className={styles.title}>
        Menus Family
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusFamily}
        action={updateDisponibilite}
      />
           <h1
        className={styles.title}>
        Menus Enfants
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={menusEnfants}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Pizzas Sauce Tomate
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={pizzaSauceTomate}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Pizzas Crème Fraîche
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={pizzaCremeFraiche}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Pizzas Sauce Spéciale
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={pizzaSauceSpeciale}
        action={updateDisponibilite}
      />
      <h1
        className={styles.title}>
        Accompagnements
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={accompagnements}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Burgers
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={burgers}
        action={updateDisponibilite}
      />
         <h1
        className={styles.title}>
        Paninis
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={paninis}
        action={updateDisponibilite}
      />
      <h1
        className={styles.title}>
        Croqs
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={croq}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Salades
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={salades}
        action={updateDisponibilite}
      />

    
         <h1
          className={styles.title}>
          Desserts
        </h1>
        <TableBox
          proprietes={proprietes}
          donnees={desserts}
          action={updateDisponibilite}
        />

        <h1
          className={styles.title}>
          Milkshakes
        </h1>
        <TableBox
          proprietes={proprietes}
          donnees={milkshakes}
          action={updateDisponibilite}
        />

        <h1
        className={styles.title}>
        Smoothies
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={smoothies}
        action={updateDisponibilite}
      />
         <h1
        className={styles.title}>
        Boissons
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={boissons}
        action={updateDisponibilite}
      />

    </div>
  );
};
export default Disponibilite;