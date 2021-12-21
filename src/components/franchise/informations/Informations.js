import React, { Component } from 'react';
import "./Informations.css"
import star from "../../../images/blackstar.svg";
import Typography from '@material-ui/core/Typography';
import item1 from "../../../images/Items/item1.png";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Icon1 from "../../../images/info-pratiques/icon-info1.png";
import Icon2 from "../../../images/info-pratiques/icon-info2.png";
import Icon3 from "../../../images/info-pratiques/icon-info3.png";
import Icon4 from "../../../images/info-pratiques/icon-info4.png";
import Icon5 from "../../../images/info-pratiques/icon-info5.png";

class Informations extends Component {
    render() {
        return (
            <div className="informations" id="informations_franchise">
                <div className="infosTitleContainer">
                    <Typography gutterBottom variant="h5" component="h1" className="infosTitle">
                        <img src={star} /> Informations Pratiques <img src={star} />
                    </Typography>
                </div>

                    <div className="cardContainerTop">

                        <div className="infosItemContainer">
                            <div className="rond_red_info">
                                <img src={Icon1} alt="title"></img>
                            </div>     
                            
                            <div className="infosItemDescription">
                                <h5>5 ans</h5>
                                <p>Contrat de franchise</p>
                            </div>
                        </div>

                        <div className="infosItemContainer">
                            <div className="rond_red_info">
                            <img src={Icon2} alt="title"></img>
                            </div>
                            <div className="infosItemDescription">
                                <h5>25 000 € HT</h5>
                                <p>Droits d'entrée</p>
                            </div>
                        </div>

                    </div>

                    <div className="cardContainerBottom">

                        <div className="infosItemContainer">
                            <div className="rond_red_info">
                            <img src={Icon3} alt="title"></img>
                            </div>
                            <div className="infosItemDescription">
                                <h5>15 000 € HT</h5>
                                <p>Formation initiale</p>
                            </div>
                        </div>

                        <div className="infosItemContainer">
                            <div className="rond_red_info">
                            <img src={Icon4} alt="title"></img>
                            </div>
                            <div className="infosItemDescription">
                                <h5>5%</h5>
                                <p>Redevance d'enseigne</p>
                            </div>
                        </div>

                        <div className="infosItemContainer">
                            <div className="rond_red_info">
                            <img src={Icon5} alt="title"></img>
                            </div>
                            <div className="infosItemDescription">
                                <h5>2%</h5>
                                <p>Redevance de communication</p>
                            </div>
                        </div>

                    </div>
                
            </div>
        );
    }
}

export default Informations;