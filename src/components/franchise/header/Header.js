import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import "./Header.css"
import star from "../../../images/star.svg";
import item1 from "../../../images/Items/item1.png";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import GroupIcon from '@material-ui/icons/Group';
import {FranchiseContent} from "../../../data/franchiseContent.js";


class Header extends Component {
    render() {
        return (
            <div className="franchise" id="header_franchise">
                <div className="franchiseTitleContainer">
                    <Typography gutterBottom variant="h5" component="h1" className="franchiseTitle">
                        <img src={star} /> Devenir Franchisé <img src={star} />
                    </Typography>
                </div>

                <div className="franchiseAvantagesContainer">
                    <Typography gutterBottom variant="h5" component="h1" className="franchiseAvantages">
                        Nos Avantages 
                    </Typography>
                </div>

                <div className="franchiseDescriptionContainer">
                    {FranchiseContent.map((content) => (
                        <div className="itemContainer">
                            <div className="rond_red_header">
                                <img src={content.photo}></img>
                            </div>
                        <div className="itemDescription">
                            <h5>{content.text}</h5>
                        </div>
                    </div>
                    ))}
                    
                    
                </div>
            </div>
        );
    }
}

export default Header;