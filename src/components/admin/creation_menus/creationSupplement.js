
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";

import "./creationMenus.css";
import Alert from "../alert_message/Alert";
import { URL } from "../../../middlewares/request";
import SwitchBtn from "../../switch/SwitchBtn";
import { sendrequest } from "../../../middlewares/request";

const CreationIngredients = (props) => {
    /* List des différentes données */
    const [list, setList] = useState([])
    const [listType, setListType] = useState([])
    const [listCategorie, setListCategorie] = useState([])

    /* Ajout d'un nouveau supplément */
    const [supplement, setSupplement] = useState("")
    const [prix, setPrix] = useState(0)
    const [dispo, setDispo] = useState(false)
    const [typeSupplement, setTypeSupplement] = useState("")
    const [category, setCategory] = useState("")

    /* Ajout d'un nouveau type de supplément */
    const [nomType, setNomType] = useState("")
    const [load, setLoad] = useState(false)

    /* ERRORS & MODIFICATIONS */
    const [error, setError] = useState({ check: false, msg: "" })
    const [trash, setTrash] = useState({ bool: false, index: null })
    const [modify, setModify] = useState(false)

    /* Fetch data */
    const fetchData = async () => {
        console.log("je lance")
        sendrequest(
            "get",
            "restaurant/supplement/",
            setList,
            setLoad
        );
        sendrequest(
            "get",
            "restaurant/type_supplement/",
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

    //Handle the value which is changed
    function changeValue(action, index, value) {
        let tmp = [...list]; // Temporaly variable to set the new list of ingredient updated
        let i = tmp.findIndex((element) => element.id == index);
        switch (action) { // modify which columns  ?
            case "nom":
                tmp[i].nom = value;
                setList(tmp);
                break;

            case "prix":
                tmp[i].prix = value;
                setList(tmp);
                break;

            case "disponibilite":
                tmp[i].disponibilite = value;
                setList(tmp);
                break;
        }
    }

    //Handle the type ingredient value which is changed
    function changeTypeValue(index, value) {
        console.log(index + "   " + value)
        let tmp = [...listType];
        let i = tmp.findIndex((element) => element.id == index);
        tmp[i].nom = value;
        setListType(tmp);
        console.log(listType)
    }

    // Send changes for ingredient
    async function sendChanges() {
        for (let i = 0; i < list.length; i++) {
            await axios.put(URL + "restaurant/supplement/" + list[i]?.id + '/',
                {
                    id: list[i].id,
                    nom: list[i].nom,
                    prix: list[i].prix,
                    disponibilite: list[i].disponibilite,
                    type_supplement: list[i].type_supplement,
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

    // Send changes for type_ingredient
    async function sendTypeChanges() {
        console.log(list)
        for (let i = 0; i < listType.length; i++) {
            await axios.put(URL + "restaurant/type_supplement/" + list[i]?.id + '/',
                {
                    id: listType[i].id,
                    nom: listType[i].nom,
                }
            ).then((response) => {
                console.log(response)
            })
        }
    }

    // Add the new ingredient
    async function addSupplement() {
        console.log(parseFloat(prix) > -0.1)
        if (supplement !== null && supplement != "" && typeSupplement !== null && typeSupplement !== "" && parseFloat(prix) > -0.1 && category !== null && category !== "") {
            await axios.post(URL + "restaurant/supplement/",
                {
                    nom: supplement,
                    prix: prix,
                    disponibilite: dispo,
                    type_supplement: typeSupplement,
                    categorie: category,
                }
            ).then()
                .catch((e) => {
                    console.log(e.response)
                })
            setError({ check: false, msg: "" })
            setLoad(false)
            fetchData()

        } else {
            setError({ check: true, msg: "Veuillez correctement saisir les informations" })
        }
    }

    // Add the new ingredient's type
    async function addTypeSupplement() {
        await axios.post(URL + "restaurant/type_supplement/",
            {
                nom: nomType,
            }
        )
        setLoad(false)
        fetchData()
    }

    // Delete an ingredient
    async function deleteValue(index) {
        await axios.delete(URL + "restaurant/supplement/" + index + '/'
        )
        let tmp = [...list];
        let i = tmp.findIndex((element) => element.id == index);
        if (i > -1) {
            tmp.splice(i, 1);
            setList(tmp)
        }
    }

    // Delete a type
    async function deleteType(index) {
        await axios.delete(URL + "restaurant/type_supplement/" + index + '/'
        )
        let tmp = [...listType];
        let i = tmp.findIndex((element) => element.id == index);
        if (i > -1) {
            tmp.splice(i, 1);
            setListType(tmp)
        }
        fetchData()
    }

    // Check the user confirmation for modify
    function callBackModify(bool) {
        if (bool) {
            sendChanges()
            sendTypeChanges()
        }
        setModify(false)
    }

    // Check the user confirmation for delete
    function callBackTrash(bool) {
        switch (trash.choice) {
            case "supplement":
                if (bool) {
                    deleteValue(trash.index)
                }
                break;
            case "type_supplement":
                if (bool) {
                    deleteType(trash.index)
                }
                break;
        }
        setTrash(false)
    }

    // Popup for modification
    function verifyForm() {
        setModify(true)
    }

    useEffect(() => {
        fetchData();
        console.log(listCategorie)
    }, [load]);


    return (
        <div className="creation_menus_popup"> {/* onClick={ () => {props.close(false)}} */}
            <i class="fas fa-times close" onClick={() => { props.close(false) }}></i>
            <div className="contain">
                <h2>Création d'un menu</h2>
                <br />
                <h4>Supplément :</h4>
                <br />
                <div>
                    <TextField
                        label="Saisissez le supplement"
                        id="outlined-basic"
                        variant="outlined"
                        name="supplement"
                        className="creation_menus_popup_button"
                        value={supplement}
                        onChange={(e) => { setSupplement(e.target.value) }}
                        required
                    />
                    <TextField
                        label="Saisissez le prix"
                        id="outlined-basic"
                        variant="outlined"
                        name="prix"
                        className="creation_menus_popup_button"
                        value={prix}
                        onChange={(e) => { setPrix(e.target.value) }}
                        required
                    />
                    <br />
                    <br />
                    <label>Disponibilité :</label>
                    <SwitchBtn
                        val={dispo}
                        action={setDispo}
                        item={{ id: 1, dispo: dispo }}
                    />

                    <label>Type de supplément :</label><br />
                    <select name="type_supplement" id="type_supplement" onChange={(e) => { setTypeSupplement(e.target.value); }}>
                        <option value="" selected disabled>--Sélectionnez votre type de supplément--</option>
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
                    <button className="button_inside" onClick={addSupplement} style={{ width: "20em" }}>Ajouter un supplément</button>
                    <br />
                    <br />
                    <div className="line"> </div>

                    <h4>Type supplément :</h4>
                    <br />
                    <TextField
                        label="Type de supplément"
                        id="outlined-basic"
                        variant="outlined"
                        name="supplement"
                        className="creation_menus_popup_button"
                        value={nomType}
                        onChange={(e) => { setNomType(e.target.value) }}
                        required
                    />
                    <br />
                    <br />
                    <button className="button_inside" type="submit" onClick={addTypeSupplement}>Ajouter</button>
                </div>


                <br />
                <div className="line"> </div>

                <h4>Liste des suppléments :</h4>
                <br />
                <ul>
                    {
                        load ?
                            list.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <div className="align">
                                            <input type="text" id={i.id} name="supplement_nom" value={i.nom} className="creation_menus_popup_input" required minlength="4" size="10" onChange={(e) => { changeValue("nom", e.target.id, e.target.value) }} />
                                            <input type="number" step="any" id={i.id} name="supplement_prix" value={i.prix} className="creation_menus_popup_input" style={{ width: "3em", }} required min="0" size="10" onChange={(e) => { changeValue("prix", e.target.id, e.target.value) }} />€
                                            <label>Type de supplément: {listType.map(o => {
                                                if (o.id === i.type_supplement) {
                                                    return o.nom
                                                }
                                            })}</label>

                                            <label>Catégorie : {listCategorie.map(o => {
                                                if (o.id === i.categorie) {
                                                    return o.nom
                                                }
                                            })}</label>

                                            <SwitchBtn
                                                val={i.disponibilite}
                                                action={handleDispo}
                                                item={{ id: i.id, dispo: i.disponibilite }}
                                            />

                                            <i class="fa fa-trash" aria-hidden="true" style={{ color: "red", width: "0", marginLeft: "-10%", }} onClick={() => { setTrash({ bool: true, index: i.id, choice: "supplement" }) }}></i>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            null
                    }
                </ul>


                <br />
                <div className="line"> </div>

                <h4>Liste des types de suppléments :</h4>
                <br />
                <ul>
                    {
                        load ?
                            listType.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <input type="text" id={i.id} name="supplement" value={i.nom} className="creation_menus_popup_input" size="10" onChange={(e) => { changeTypeValue(e.target.id, e.target.value) }} />
                                        <i class="fa fa-trash" aria-hidden="true" style={{ color: "red", }} onClick={() => { setTrash({ bool: true, index: i.id, choice: "type_supplement" }) }}></i>
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