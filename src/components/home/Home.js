import React, { Component } from 'react';
import Header from './header/Header';
import Plats from './plats/Plats';
import Galerie from './galerie/Galerie';


class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <Plats />
                <Galerie />
            </div>
        );
    }
}

export default Home;