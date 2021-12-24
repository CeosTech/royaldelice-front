
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import "./creationMenus.css";
import Alert from "../alert_message/Alert"
import { URL } from "../../../middlewares/request";

import { sendrequest } from "../../../middlewares/request";

const CreationMenus = (props) => {
    /* categorie */
    const [list, setList] = useState([])
    const [category, setCategory] = useState("")
    const [load, setLoad] = useState(false)

    /* ERRORS */
    const [error, setError] = useState({ check: false, msg: "" })
    const [trash, setTrash] = useState({ bool: false, index: null })
    const [modify, setModify] = useState(false)

    const fetchData = async () => {
        console.log("je lance")
        sendrequest(
            "get",
            "restaurant/categorie/?ordering=id",
            setList,
            setLoad
        );
    }

    function changeValue(index, value) {
        let tmp = [...list];
        let i = tmp.findIndex((element) => element.id == index);
        tmp[i].nom = value;
        setList(tmp);
    }

    async function sendChanges() {
        for (let i = 0; i < list.length; i++) {
            await axios.put(URL + "restaurant/categorie/" + list[i].id + '/',
                {
                    id: list[i].id,
                    nom: list[i].nom,
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

    function check(tab, value){
        let res = false
        tab.map((i) => {
            if(i.nom === value){
                res = true
            }
        })
        return res
    }

    async function addCategory() {
        if (!check(list, category)) {
            await axios.post(URL + "restaurant/categorie/",
                {
                    nom: category,
                }
            )
            setLoad(false)
            fetchData()
        } else {
            alert("La catégorie existe déjà !");
        }
    }

    async function deleteValue(index) {
        await axios.delete(URL + "restaurant/categorie/" + index + '/'
        )
        let tmp = [...list];
        let i = tmp.findIndex((element) => element.id == index);
        if (i > -1) {
            tmp.splice(i, 1);
            setList(tmp)
        }
    }

    function callBackModify(bool) {
        if (bool) {
            sendChanges()
        }
        setModify(false)
    }

    function callBackTrash(bool) {
        if (bool) {
            deleteValue(trash.index)
        }
        setTrash(false)
    }

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
                <h4>Catégorie :</h4>
                <div>
                    <TextField
                        label="Saisiez la catégorie"
                        id="outlined-basic"
                        variant="outlined"
                        name="category"
                        className="creation_menus_popup_button"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        required
                    />
                    <br />
                    <br />
                    <button className="button_inside" onClick={addCategory}>Ajouter</button>
                </div>

                <ul>
                    {
                        load ?
                            list.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <input type="text" id={i.id} name="category" value={i.nom} className="creation_menus_popup_input" required minlength="4" maxlength="8" size="10" onChange={(e) => { changeValue(e.target.id, e.target.value) }} />
                                        <i class="fa fa-trash" aria-hidden="true" style={{ color: "red", }} onClick={() => { setTrash({ bool: true, index: i.id }) }}></i>
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


export default CreationMenus;