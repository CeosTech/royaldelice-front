import React from "react";
import "./Alert.css";

const Alerts = (props) => {

    function handleSubmit(bool) {
        if (bool) {
            props.parentCallback(bool)
        } else {
            props.parentCallback(bool)
        }
    }

    return (
        <div className='alertsSupp'>
            <div className="content">
                <h4>Etes vous sur de vouloir {props.nom} ?</h4>
                <div className="centeredButtons">
                    <button
                        className="yes_button"
                        onClick={() => {
                            handleSubmit(true)
                        }}
                    >
                        Oui
                    </button>
                    <button
                        className="no_button"
                        onClick={() => {
                            handleSubmit(false)
                        }}
                    >
                        Non
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
