import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";

import AlertValider from "../alert_message/Alert"
import { URL } from "../../../middlewares/request";

import "./index.css";

const ZoneLivraison = () => {
    /* ZONE ADRESSE */
    const [list, setList] = useState([])
    const [loading, setLoad] = useState(false)
    const [zone1, setZone1] = useState("");
    const [zone2, setZone2] = useState("");
    const [zone3, setZone3] = useState("");

    /* MINIMUM COMMANDE */
    const [min1, setMin1] = useState(0);
    const [min2, setMin2] = useState(0);
    const [min3, setMin3] = useState(0);

    /* FRAIS LIVRAISON */
    const [frais1, setFrais1] = useState(0);
    const [frais2, setFrais2] = useState(0);
    const [frais3, setFrais3] = useState(0);


    /* ERRORS */
    const [error, setError] = useState({ check: false, msg: "" })
    const [trash, setTrash] = useState(false)

    // Retrieve data
    const fetchData = async () => {
        console.log("je lance")
        const res = await axios.get(URL + "restaurant/zone-livraison");
        setList(res.data)
        setLoad(true)
    }

    // Handle the different input changes (zone, frais, montant)
    function handleInputChange(e) {
        switch (e.target.name) {
            case "zone1":
                setZone1(e.target.value)
                break;

            case "zone2":
                setZone2(e.target.value)
                break;
            case "zone3":
                setZone3(e.target.value)
                break;
            case "montant1":
                setMin1(e.target.value)
                break;

            case "montant2":
                setMin2(e.target.value)
                break;

            case "montant3":
                setMin3(e.target.value)
                break;

            case "frais1":
                setFrais1(e.target.value)
                break;

            case "frais2":
                setFrais2(e.target.value)
                break;
            case "frais3":
                setFrais3(e.target.value)
                break;
        }
    }

    // Send the information to the API
    async function sendChanges() {
        await axios.put(URL + "restaurant/zone-livraison/1/",
            {
                nom: "Zone 1",
                montant: min1,
                description: zone1,
                frais: frais1,
            }
        )
        await axios.put(URL + "restaurant/zone-livraison/2/",
            {
                nom: "Zone 2",
                montant: min2,
                description: zone2,
                frais: frais2,
            }
        )
        await axios.put(URL + "restaurant/zone-livraison/3/",
            {
                nom: "Zone 3",
                montant: min3,
                description: zone3,
                frais: frais3,
            }
        )
    }

    // Check if the use confirm the changes
    function callBack(bool) {
        if (bool) {
            sendChanges()
        }
        setTrash(false)
    }

    // Verify the input
    function verifyForm() {
        console.log("Je verifie")
        if (
            (zone1 !== null && zone1 !== "") &&
            (zone2 !== null && zone2 !== "") &&
            (zone3 !== null && zone3 !== "")
        ) {
            if (
                (min1 >= 0) &&
                (min2 >= 0) &&
                (min3 >= 0) &&
                (frais1 >= 0) &&
                (frais2 >= 0) &&
                (frais3 >= 0)
            ) {
                console.log(2)
                setError({ check: false, msg: "" })
                /* sendChanges() */
                setTrash(true)
            } else {
                setError({ check: true, msg: "Les informations fournies ne sont pas valides" })
            }

        } else {
            console.log("ERREUR")
            setError({ check: true, msg: "Les informations fournies ne sont pas valides" })
        }
    }

    useEffect(() => {
        fetchData();

        if (list.length > 0) { // check if there is data in order to put them in the differents fields
            setZone1(list[0]?.description)
            setMin1(list[0]?.montant)
            setFrais1(list[0]?.frais)

            setZone2(list[1]?.description)
            setMin2(list[1]?.montant)
            setFrais2(list[1]?.frais)

            setZone3(list[2]?.description)
            setMin3(list[2]?.montant)
            setFrais3(list[2]?.frais)
        }
        console.log("TEST" + zone1)

    }, [loading]);


    return (
        <div id="zone_livraison">

            <h2>Zone 1</h2>
            <br />
            <TextField
                fullWidth
                label="Montant minimum zone 1 en euro TTC"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="montant1"
                value={min1}
                onChange={handleInputChange}
                required
            />
            <TextField
                fullWidth
                label="Frais de livraison"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="frais1"
                value={frais1}
                onChange={handleInputChange}
                required
            />
            <TextField
                fullWidth
                label="zone 1"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="zone1"
                value={zone1}
                onChange={handleInputChange}
                required
            />
            <br />

            <h2>Zone 2</h2>
            <br />
            <TextField
                fullWidth
                label="Montant minimum zone 2 en euro TTC"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="montant2"
                value={min2}
                onChange={handleInputChange}
                required
            />
            <TextField
                fullWidth
                label="Frais de livraison"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="frais2"
                value={frais2}
                onChange={handleInputChange}
                required
            />
            <TextField
                fullWidth
                label="zone 2"
                id="outlined-basic"
                variant="outlined"
                className="societe_input"
                name="zone2"
                value={zone2}
                onChange={handleInputChange}
                required
            />
            <br />

            <h2>Zone 3</h2>
            <br />
            <TextField
                fullWidth
                label="Montant minimum zone 3 en euro TTC"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="montant3"
                value={min3}
                onChange={handleInputChange}
                required
            />
            <TextField
                fullWidth
                label="Frais de livraison"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="frais3"
                value={frais3}
                onChange={handleInputChange}
                required
            />
            <TextField
                fullWidth
                label="zone 3"
                id="outlined-basic"
                variant="outlined"
                /* className="societe_input" */
                name="zone3"
                value={zone3}
                onChange={handleInputChange}
                required
            />

            {error.check ? <p style={{ color: "red" }}>{error.msg}</p> : null}
            <button className="button_valider" onClick={verifyForm}>Valider</button>
            {trash ? <AlertValider parentCallback={callBack} /> : null}
        </div>
    );
};


export default ZoneLivraison;