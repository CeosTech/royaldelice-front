
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import "./creationMenus.css";
import Alert from "../alert_message/Alert"
import { URL } from "../../../middlewares/request";
import SwitchBtn from "../../switch/SwitchBtn";

import { sendrequest } from "../../../middlewares/request";

const CreationIngredients = (props) => {
    /* categorie */
    const [list, setList] = useState([])
    const [listType, setListType] = useState([])
    const [listCategorie, setListCategorie] = useState([])

    const [ingredient, setIngredient] = useState("")
    const [typeIngredient, setTypeIngredient] = useState("")
    const [nomType, setNomType] = useState("")
    const [load, setLoad] = useState(false)
    const [category, setCategory] = useState("")
    const [dispo, setDispo] = useState(false)

    /* ERRORS */
    const [error, setError] = useState({ check: false, msg: "" })
    const [trash, setTrash] = useState({ bool: false, index: null })
    const [modify, setModify] = useState(false)

    // Retrieve data
    const fetchData = async () => {
        console.log("je lance")
        sendrequest(
            "get",
            "restaurant/ingredient/",
            setList,
            setLoad
        );
        sendrequest(
            "get",
            "restaurant/type_ingredient/",
            setListType,
            setLoad
        );
        sendrequest(
            "get",
            "restaurant/categorie/",
            setListCategorie,
            setLoad
        );
    }

    //Handle the disponibilite input
    const handleDispo = (index, value) => {
        changeValue("disponibilite", index, value)
    }

    // Handle the disponibility for the creation
    const handleAddDispo = (index, value) => {
        setDispo(value)
    }

    // Change the value for ingredients
    function changeValue(action, index, value) {
        let tmp = [...list]; // Temporaly variable to set the new list of ingredient updated
        let i = tmp.findIndex((element) => element.id == index);
        switch (action) { // modify which columns  ?
            case "nom":
                tmp[i].nom = value;
                setList(tmp);
                break;
            case "disponibilite":
                tmp[i].disponibilite = value;
                setList(tmp);
                break;
        }
    }

    // Change type_ingredient's name
    function changeTypeValue(index, value) {
        let tmp = [...listType];
        let i = tmp.findIndex((element) => element.id == index);
        tmp[i].nom = value;
        setListType(tmp);
    }

    // Send ingredient changes (for variable list)
    async function sendChanges() {
        for (let i = 0; i < list.length; i++) {
            await axios.put(URL + "restaurant/ingredient/" + list[i].id + '/',
                {
                    id: list[i].id,
                    nom: list[i].nom,
                    disponibilite: list[i].disponibilite,
                }
            ).then((response) => {
                console.log(response)
            })
                .catch((error) => {
                    console.log("======================================")
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                })
        }
    }

    // Send type_ingredient changes 
    async function sendTypeChanges() {
        for (let i = 0; i < listType.length; i++) {
            await axios.put(URL + "restaurant/type_ingredient/" + listType[i].id + '/',
                {
                    id: listType[i].id,
                    nom: listType[i].nom,
                }
            ).then((response) => {
                console.log(response)
            })
                .catch((error) => {
                    console.log("======================================")
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                })
        }
    }

    // Check if the value exist in tab
    function check(tab, value) {
        let res = false
        tab.map((i) => {
            if (i.nom === value) {
                res = true
            }
        })
        return res
    }

    // Add an ingredient  : nom, typeIngredient, categorie & disponibilite
    async function addIngredient() {
        if (typeIngredient !== null && typeIngredient !== "" && category !== null && category != "") {
            console.log(ingredient, typeIngredient)
            await axios.post(URL + "restaurant/ingredient/",
                {
                    nom: ingredient,
                    typeIngredient: typeIngredient,
                    categorie: category,
                    disponibilite: dispo,
                }
            ).then()
                .catch((e) => {
                    console.log(e.response)
                })
            setError({ check: false, msg: "" })
            setLoad(false)
            fetchData()
            setIngredient("")
        } else {
            setError({ check: true, msg: "Veuillez correctement saisir les informations" })
        }
    }

    // Add a type_ingredient : nom
    async function addTypeIngredient() {
        if (!check(listType, nomType)) {
            await axios.post(URL + "restaurant/type_ingredient/",
                {
                    nom: nomType,
                }
            )
            setLoad(false)
            fetchData()
            setNomType("")
        } else {
            alert("La catégorie existe déjà !");
        }
    }

    // Delete an ingredient value
    async function deleteValue(index) {
        await axios.delete(URL + "restaurant/ingredient/" + index + '/'
        )
        let tmp = [...list];
        let i = tmp.findIndex((element) => element.id == index);
        if (i > -1) {
            tmp.splice(i, 1);
            setList(tmp)
        }
    }

    // Delete a type of type_ingredient
    async function deleteType(index) {
        await axios.delete(URL + "restaurant/type_ingredient/" + index + '/'
        )
        let tmp = [...listType];
        let i = tmp.findIndex((element) => element.id == index);
        if (i > -1) {
            tmp.splice(i, 1);
            setListType(tmp)
        }
        fetchData()
    }

    // Check if user confirm for his changes
    function callBackModify(bool) {
        if (bool) {
            sendChanges()
            sendTypeChanges()
        }
        setModify(false)
    }

    // Check if user confirm for his deletion
    function callBackTrash(bool) {
        switch (trash.choice) {
            case "ingredient":
                if (bool) {
                    deleteValue(trash.index)
                }
                break;
            case "type_ingredient":
                if (bool) {
                    deleteType(trash.index)
                }
                break;
        }
        setTrash(false)
    }

    // Verify if all input are right
    function verifyForm() {
        setModify(true)
    }

    useEffect(() => {
        fetchData();
        console.log(list)
    }, [load]);


    return (
        <div className="creation_menus_popup"> {/* onClick={ () => {props.close(false)}} */}
            <i class="fas fa-times close" onClick={() => { props.close(false) }}></i>
            <div className="contain">
                <h2>Création d'un menu</h2>
                <br />
                <h4>Ajouter une catégorie :</h4>
                <br />
                <div>
                    <TextField
                        label="Saisissez l'ingredient"
                        id="outlined-basic"
                        variant="outlined"
                        name="ingredient"
                        className="creation_menus_popup_button"
                        value={ingredient}
                        onChange={(e) => { setIngredient(e.target.value) }}
                        required
                    />
                    <br />
                    <br />

                    <select name="type_ingredient" id="type_ingredient" onChange={(e) => { setTypeIngredient(e.target.value) }}>
                        <option value="" selected disabled>--Sélectionnez votre type d'ingrédient--</option>
                        {
                            listType.map((i) => {
                                return (
                                    <option value={i.id}>{i.nom}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    <br />

                    <label>Catégorie :</label>
                    <br />
                    <select name="type_supplement" id="type_supplement" onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="" selected disabled>--Sélectionnez la catégorie--</option>
                        {
                            listCategorie.map((i) => {
                                return (
                                    <option value={i.id}>{i.nom}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    <br />

                    <label>Disponibilité de l'ingrédient :</label>
                    <SwitchBtn
                        val={dispo}
                        action={handleAddDispo}
                        item={{ id: 0, dispo: dispo }}
                    />

                    <br />
                    <br />

                    <button className="button_inside" onClick={addIngredient} style={{ width: "10em", }}>Ajouter un ingrédient</button>
                    <br />
                    <div className="line"> </div>
                    <br />

                    <h4>Ajouter un nouveau type de catégorie :</h4>
                    <br />
                    <TextField
                        label="Nouveau type ingrédient"
                        id="outlined-basic"
                        variant="outlined"
                        name="ingredient"
                        className="creation_menus_popup_button"
                        value={nomType}
                        onChange={(e) => { setNomType(e.target.value) }}
                        required
                    />
                    <br />
                    <br />

                    <button className="button_inside" onClick={addTypeIngredient}>Ajouter</button>
                    <div className="line"> </div>
                </div>

                <h4>Liste des ingrédients :</h4>
                <br />
                <ul>
                    {
                        load ?
                            list.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <div className="align">
                                            <input type="text" id={i.id} name="ingredient" value={i.nom} className="creation_menus_popup_input" required minlength="4" size="10" onChange={(e) => { changeValue("nom", e.target.id, e.target.value) }} />
                                            <label style={{ marginRight: "1%" }}>Type d'ingrédient : {listType.map(o => {
                                                if (o.id === i.typeIngredient) {
                                                    return o.nom
                                                }
                                            })} </label>

                                            <label> Catégorie: {listCategorie.map(o => {
                                                if (o.id === i.categorie) {
                                                    return o.nom
                                                }
                                            })}</label>
                                            <SwitchBtn
                                                val={i.disponibilite}
                                                action={handleDispo}
                                                item={{ id: i.id, dispo: i.disponibilite }}
                                            />
                                            <i class="fa fa-trash" style={{ color: "red", width: "0", marginLeft: "-10%", }} aria-hidden="true" onClick={() => { setTrash({ bool: true, index: i.id, choice: "ingredient" }) }}></i>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            null
                    }
                </ul>


                <div className="line"> </div>
                <br />

                <h4>Liste des types d'ingrédient :</h4>
                <br />
                <ul>
                    {
                        load ?
                            listType.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <input type="text" id={i.id} name="ingredient" value={i.nom} className="creation_menus_popup_input" required minlength="4" size="10" onChange={(e) => { changeTypeValue(e.target.id, e.target.value) }} />
                                        <i class="fa fa-trash" aria-hidden="true" style={{ color: "red", }} onClick={() => { setTrash({ bool: true, index: i.id, choice: "type_ingredient" }) }}></i>
                                    </li>
                                )
                            })
                            :
                            null
                    }
                </ul>

                <br />

                {error.check ? <p style={{ color: "red" }}>{error.msg}</p> : null}
                <button className="button_inside" type="submit" onClick={verifyForm}>Valider</button>
                {modify ? <Alert parentCallback={callBackModify} nom="modifier" /> : null}
                {trash.bool ? <Alert parentCallback={callBackTrash} nom="supprimer" /> : null}
            </div>
        </div>
    );
};


export default CreationIngredients;