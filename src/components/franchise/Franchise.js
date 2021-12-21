import React, { Component } from 'react';
import Formulaire from './form/index';
import Header from './header/Header';
import Infos from './informations/Informations';


class Franchise extends Component {
    render() {
        return (
            <div>
                <Header />
                <Infos />
                <Formulaire />
            </div>
        );
    }
}

export default Franchise;