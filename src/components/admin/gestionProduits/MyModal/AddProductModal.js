import axios from "axios";
import { useState, useEffect } from "react";
import { URL } from "../../../../middlewares/request"
import { Button, IconButton, TextField } from "@material-ui/core";
import {
    FormControlLabel,
    FormControl,
    RadioGroup,
    Radio,
    Checkbox,
    OutlinedInput,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
/*import "./modal.css";*/
import Modal from "../MyModal/Modal";
import Spinner from "../../../../images/spinner.gif"

export default function ({
    categorieId,
    show,
    setShow,
    productToUpdate = null,
    id,
    nom,
    description,
    supplement,
    prix,
    image,
    categorie,
    disponibilite,
}) {

    const initialProduct = () => {

        return ({
            nom: nom ? nom : "",
            prix: prix ? prix : 0.0,
            image: image ? image : null,
            description: description ? description : "",
            categorie: categorieId,
            supplement: supplement ? supplement : false,
            disponibilite: disponibilite ? disponibilite : true
        });


    }
    const [product, setProduct] = useState(initialProduct());
    const [loading, setLoading] = useState(false)

    const [imageImported, setImageImported] = useState(false);

    useEffect(() => {
        setProduct(initialProduct())
        if (productToUpdate !== null) {
            setProduct({...productToUpdate})
        }

    }, [productToUpdate]);

    const handleClose = (e) => {
        if (
            e.target.classList.contains("myModal__backdrop") ||
            e.target.classList.contains("myModal__modal__close-btn") ||
            e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
            e.target.parentNode.parentNode.classList.contains(
                "myModal__modal__close-btn"
            )
        ) {
            setShow(false);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("========= AJOUT =================")
        console.log(product)

        let form_data = new FormData();
        form_data.append("nom", product.nom);
        form_data.append("description", product.description);
        if (product.image !== null)
            form_data.append("image", product.image, product.image.name);
        form_data.append("prix", product.prix);
        form_data.append("categorie", categorieId);
        form_data.append("disponibilite", product.disponibilite);
        form_data.append("supplement", product.supplement);
        console.log(`from_data`, form_data)
        let url = URL + "restaurant/produit/";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                setLoading(false)
                console.log(`added susscessfully`)
                window.location.reload(false)
            })
            .catch((error) => {
                console.error(error.response)
            });

    }

    const deleteProduct = async () => {
        await axios.delete(URL + "restaurant/produit/" + id + "/")
            .then(() => { window.location.reload(false) })
            .catch(error => console.error(error));
    }

    const updateProduct = (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(`form_data`, product);
        let form_data = new FormData();
        form_data.append("nom", product.nom);
        form_data.append("description", product.description);
        if (product.image === null || typeof product.image === "string") {
            console.log("nothing change")
        }
        else {
            form_data.append("image", product.image);
        }
        form_data.append("prix", product.prix);
        form_data.append("categorie", product.categorie);
        form_data.append("disponibilite", product.disponibilite);
        form_data.append("supplement", product.supplement);
        let url = URL + "restaurant/produit/" + id + "/";
        axios
            .put(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(`updated susscessfully`);
                setLoading(false)
                window.location.reload(false);
            })
            .catch((error) => {
                console.error(error);
            });


        //window.location.reload(false); 
    }

    const inputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.checked })
    }

    return (

        <Modal showModal={show} setShowModal={setShow} handleClose={handleClose}>
            <Modal.Header>
                {productToUpdate ?
                    <h1>Modifier un Produit</h1>
                    :
                    <h1>Ajouter un Produit</h1>
                }
            </Modal.Header>

            <Modal.Body.Heading
                style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}>
                Informations du produit
            </Modal.Body.Heading>

            <Modal.Body>
                <FormControl >
                    <div className="basic-input">
                        <TextField
                            id="input-nom"
                            label="nom"
                            variant="outlined"
                            name="nom"
                            size="small"
                            value={product?.nom}
                            onChange={inputChange}
                        />
                    </div>
                    <div className="basic-input">
                        <TextField
                            id="input-description"
                            label="description"
                            variant="outlined"
                            multiline
                            name="description"
                            size="small"
                            value={product?.description}
                            onChange={inputChange}
                        />
                    </div>
                    <div className="basic-input">
                        <TextField
                            id="image"
                            type="file"
                            variant="outlined"
                            size="small"
                            name="image"
                            onChange={(event) => {
                                const fileUploaded = event.target.files[0]
                                setProduct({ ...product, image: fileUploaded });
                                setImageImported(true);
                            }
                            }
                        />
                    </div>


                    <Modal.Body.Heading
                        style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}>
                        Le produit a-t-il des suppl??ments ?
                    </Modal.Body.Heading>
                    <button style={product.supplement ? {backgroundColor: "green", color: "white"} : {backgroundColor: "red", color: "white"} }onClick={() => {setProduct({ ...product, supplement: !product.supplement }); }}>{product?.supplement ? "OUI" : "NON"}</button>

                </FormControl >
                <Modal.Body.Heading
                    style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}>
                    Prix du produit
                </Modal.Body.Heading>
                <FormControl >
                    <div className="basic-input">
                        <TextField
                            id="input-prix"
                            label="prix"
                            variant="outlined"
                            size="small"
                            name="prix"
                            value={product?.prix}
                            onChange={inputChange}

                        />
                    </div>
                </FormControl >




            </Modal.Body>

            <Modal.Footer>
                {productToUpdate ?
                    <div
                        style={{
                            marginRight: "15px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",

                        }}>
                        <Button id="modifier_btn" onClick={updateProduct}>Modifier</Button>
                        <Button id="supprimer_btn" onClick={deleteProduct}>Supprimer</Button>
                    </div>
                    :
                    <Button id="ajouter_btn" onClick={addProduct}> Ajouter </Button>
                }
            </Modal.Footer>

            {loading ? (<img src={Spinner} className="loadingImg" />) : null}
        </Modal>
    );
};



