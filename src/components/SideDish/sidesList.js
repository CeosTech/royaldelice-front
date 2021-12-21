import React  from "react";

import "./sides.css";

import Modal from "../MyModal/Modal";
import { Button } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";

const SideDish = ({
    show,
    setShow,
    sideDishes,
    value,
    setValue,
    error,
    setError,
    setNoSidesSelected,
}) => {

  const handleSubmit = () => {
    if (value === null){
      setError(true);
    }
    else {      
      setNoSidesSelected(false);
      setError(false);
      setShow(false);
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(false);   
  }


    const handleClose = (e) => {
        // console.log(e.target.classList);

        if (
            e.target.classList.contains("myModal__modal__close-btn") ||
            e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
            e.target.parentNode.parentNode.classList.contains(
            "myModal__modal__close-btn"
            )
        ) {
          setShow(false);
          if (value === null){
            setNoSidesSelected(true);
          }
        }
    };    

  return (
    <div className="side__dish-card">
    
      <Modal showModal={show} setShowModal={setShow} handleClose={handleClose}>
      <Modal.Header>
        <h1>Votre accompagnement</h1>
      </Modal.Header> 
        <Modal.Body> 
          <FormControl component="fieldset">
            <RadioGroup 
              name='accompagnement' 
              value={value} 
              onChange={handleChange} 
              className="sides__radio-container"
            >
              {sideDishes.map((sideDish) => {
                if (sideDish.disponibilite) 
                  return (
                    <div className= "sides-radioGroup" key={sideDish.id}>
                      <FormControlLabel 
                        value={sideDish.nom} control={<Radio />} 
                        id={sideDish.id} className="radio-choice__menu"       
                        onClick={() => {
                          setError(false)
                        }}
                        /> 
                      <Modal.Body.Heading>{sideDish.nom}</Modal.Body.Heading>   
                    </div> 
                  );       
             })}
            </RadioGroup>
          </FormControl> 
        </Modal.Body>
      <Modal.Footer> 
        {error && (
          <p className="error">Veuillez choisir un accompagnement</p>
        )}   
      </Modal.Footer>
      <Modal.Footer>        
        <Button
            onClick={() => {
                handleSubmit();
            }}
            variant='contained'
            color='secondary'
            className='card__item__commander-btn'>
            Valider
        </Button>

      </Modal.Footer>
      </Modal>
   
    </div>
  );
};

export default SideDish;

