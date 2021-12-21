import Logo from "../../../images/logo_petit_m.png";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";
import { useEffect, useState } from "react";
import "./menu.css";
import { IconButton } from "@material-ui/core";
import { Switch, useHistory, useRouteMatch } from "react-router-dom";
import SwitchBtn from "../../switch/SwitchBtn";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import Admin from "../../../pages/Admin";

const AdminNav = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [active, setActive] = useState(false);
  const [items, setItems] = useState([]);

  console.log(active);

  // active
  //   ? (window.document.body.style.overflow = "hidden")
  //   : (window.document.body.style.overflow = "auto");

  const get_restaurant = async () => {
    const { data } = await axios.get(URL + "restaurant/info_restaurant/");

    setItems(data);
  };

  const deconnexion = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir vous déconnecter ? Cela aura pour conséquence de fermer le restaurant."
      )
    ) {
      await axios.put(URL + "restaurant/info_restaurant/1/", {
        disponibilite_restaurant: false,
      });
      localStorage.removeItem('jwtToken');
      history.push("/") // à voir si il y a mieux
    } else {
      // Code à éxécuter si l'utilisateur clique sur "Annuler"
    }
  };

  const updateDisponibiliteRestaurant = async (item, disponibilite) => {
    console.log(disponibilite);
    await axios.put(URL + "restaurant/info_restaurant/1/", {
      disponibilite_restaurant: disponibilite,
    });
  };

  useEffect(() => {
    get_restaurant();
    console.log(items);

    return () => {
      setItems([]);
    };
  }, []);

  console.log(items[0]);

  return (
    <div className={"adminNav " + (active ? "active" : "")}>
      <div className="adminNav__header">
        <img src={Logo} alt="df5" />
      
      </div>

      <h2 className="adminNav__title">Mustang Bondy</h2>
      {/*Switch pour ouvrir et fermer (close and open restaurant)*/}
      
      {items[0] != undefined ? (
        <SwitchBtn
          val={items[0].disponibilite_restaurant}
          action={updateDisponibiliteRestaurant}
          item={items[0]}
        />
      ) : null}
    
      <div className="adminNav__links">
        {admin.pages.map((page) => (
          <button
            key={page.name}
            className={
              "adminNav__link " +
              (admin.currentPage === page.name ? "active" : "")
            }
            onClick={() => {
              dispatch(changePage(page.name));
              history.push(path + page.path);
              setActive(false);
            }}
          >
            <i className={"fas adminNav__link__icone " + page.icone}></i>{" "}
            <p>{page.libelle}</p>
            {page.name === "nouvelles_commandes" &&
              admin.nouvelleCommandeLength > 0 && (
                <div className="adminNav__nouvelles_commandes__indicator">
                  {admin.nouvelleCommandeLength}
                </div>
              )}
            {page.name === "commandes_encours" &&
              admin.commandeCoursLength > 0 && (
                <div className="adminNav__nouvelles_commandes__indicator">
                  {admin.commandeCoursLength}
                </div>
              )}
          </button>
        ))}
        <button
          type="submit"
          onClick={() => deconnexion()}
          className="adminNav__link-deconnexion"
        >
          <i className={"fas adminNav__link__icone " + "fa-sign-out-alt"}></i>{" "}
          <p>Déconnexion</p>
        </button>
      </div>
      <div className="adminNav__close">
        <IconButton
          className="adminNav__close-btn"
          onClick={() => {setActive(!active)}}
        >
          <i
            className={"fas fa-" + (active ? "chevron-right" : "chevron-left")}
          ></i>
        </IconButton>
      </div>

      <div className="adminNav__humburger">
        <IconButton onClick={() => setActive(!active)}>
          <i className="fas fa-bars"></i>
        </IconButton>
      </div>
    </div>
  );
};

export default AdminNav;
