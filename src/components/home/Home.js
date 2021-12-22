import React, { Component } from 'react';
import Header from './header/Header';
import Plats from './plats/Plats';
import Galerie from './galerie/Galerie';
import NousRetrouver from './nousRetrouver/NousRetrouver';


class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <Plats />
                <NousRetrouver/>
                <Galerie />
            </div>
        );
    }
}

export default Home;