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
  const [load, setLoad] = useState(false)

  //console.log(active);

  // active
  //   ? (window.document.body.style.overflow = "hidden")
  //   : (window.document.body.style.overflow = "auto");

  const get_restaurant = async () => {
    await axios.get(URL + "restaurant/info_restaurant/").then( (res) => {
      setItems(res.data)
      setLoad(true)
    });

    //setItems(data);
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
      localStorage.removeItem("jwtToken");
      history.push("/"); // à voir si il y a mieux
    } else {
      // Code à éxécuter si l'utilisateur clique sur "Annuler"
    }
  };

  const updateDisponibiliteRestaurant = async (item, disponibilite) => {
    console.log(disponibilite);
    await axios.put(URL + "restaurant/info_restaurant/1/", {
      disponibilite_restaurant: disponibilite,
      automatique: false,
    }).then(() => {
      window.location.reload(false)
    });
  };

  // Update the open/close automatiion
  const updateAutomatiqueRestaurant = async () => {
    await axios
      .put(URL + "restaurant/info_restaurant/1/", {
        automatique: !items[0].automatique,
      })
      .then(() => {
        window.location.reload(false)
      }).catch((e) =>{
        console.log(e.response)
      });
  };

  // Update the open/close automatically
  async function automatiqueOpenClose() {
    console.log("====== TIME ============")
    console.log(items)
      let automatique = items[0]?.automatique; // the current information
      let now = new Date(); // current time

      // Morning
      let startClock1 = new Date(); // open
      startClock1.setHours(11, 0, 0, 0);
      let endClock1 = new Date(); // close
      endClock1.setHours(22, 0, 0, 0);

      // Only for sunday
      let startClock3 = new Date(); // open
      startClock3.setHours(11, 30, 0);
      let endClock3 = new Date(); // close
      endClock3.setHours(23, 30, 0);

      if (automatique) {
          console.log(automatique)
        if(now.getDay() !== 0){ // Monday to Saturday
          console.log("NOT SUNDAY")
          if (now.getTime() >= startClock1.getTime() && now.getTime() < endClock1.getTime()) {
            console.log("MORNING OPEN ")
            await axios.put(URL + "restaurant/info_restaurant/1/", {
              disponibilite_restaurant: true,
            });
          } else {
            console.log("MORNING CLOSE ")
            await axios.put(URL + "restaurant/info_restaurant/1/", {
              disponibilite_restaurant: false,
            });
          }
        } else { // Monday
          if (now.getTime() >= startClock3.getTime() && now.getTime() < endClock3.getTime()) {
           await axios.put(URL + "restaurant/info_restaurant/1/", {
             disponibilite_restaurant: true,
           });
         } else {
           await axios.put(URL + "restaurant/info_restaurant/1/", {
             disponibilite_restaurant: false,
           });
         }
        }
      }

  }

  useEffect(() => {
    console.log("============USE EFFECT 1 =========")
    get_restaurant();
    console.log(items);

    return () => {
      setItems([]);
    };
  }, []);

  useEffect(() => {
    console.log("============USE EFFECT 2=========")
    console.log(load)
    console.log(items)
    if (load) {
      automatiqueOpenClose()
    }

  }, [load]);

  return (
    <div className={"adminNav " + (active ? "active" : "")}>
      <div className="adminNav__header">
        <img src={Logo} alt="df5" />
      </div>

      <h2 className="adminNav__title">Royal Délice</h2>
      {/*Switch pour ouvrir et fermer (close and open restaurant)*/}

      {items[0] !== undefined ? (
        <SwitchBtn
          val={items[0].disponibilite_restaurant}
          action={updateDisponibiliteRestaurant}
          item={items[0]}
        />
      ) : null}

      <h5 className="adminNav__title">Ouverture / Fermeture automatique</h5>
      {load ? (
        <SwitchBtn
          val={items[0].automatique}
          action={updateAutomatiqueRestaurant}
          item={items[0]}
          textPrint = {false}
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
          onClick={() => {
            setActive(!active);
          }}
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
