import { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NavBarContextProvider from "./contexts/Navbar/navbarState";
import Navbar from './components/navbar/Navbar';
import Panier from "./pages/Panier";
import Paiement from "./pages/Paiement";
import Felicitation from "./pages/Felicitation";
import Commander from './components/commander/Commander';
import Franchise from './components/franchise/Franchise';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { sendrequest } from "./middlewares/request.js";
import Admin from "./pages/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/admin/security/Login";
import SecuredRoute from "./middlewares/SecuredRout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Alerts from "./components/alert/Alerts";

import CookieConsent from "react-cookie-consent";


//For all the common style
import './components/base.css';


const LoginContainer=()=><div><Route path="/login" component={Login} /></div>

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [isKeyLoaded, setIsKeyLoaded] = useState(false);

  const getAPIKeys = () => {
    sendrequest("get", "paiement/api/keys", setApiKey, setIsKeyLoaded);
  }
  useEffect(() => {
    console.log("L'API est :")
    console.log(apiKey)
    getAPIKeys();
  }, []);

  const DefaultContainer = () => {
    return(

      <div>
        <NavBarContextProvider>
          <Navbar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/carte" component={Commander}/>
          <Route exact path="/panier" component={Panier} />
          {/*<Route exact path="/franchise" component={Franchise}/>*/}
          {isKeyLoaded && (
            <Route exact path="/paiement">
              <Elements stripe={loadStripe(apiKey[0].stripe_public_key)}>
                {/*Pour les tests en prod */}
                {/*<Elements stripe={"pk_test_51IZE0cLbB6RgpOO7iZUCX9Ur3vHxEbgRHRndYTjkEuzei0jpqiDjlccIlVHQMbCZEb6zAHpd4R5tktQR3IIy5u5i00kZDxLJsh"}>*/}
                <Paiement />
              </Elements>
            </Route>
          )}
          <Route exact path="/felicitation" component={Felicitation} />
          <SecuredRoute path="/admin" component={Admin} />
        </NavBarContextProvider>
        <Footer />
      </div>

    );
}

  return (
    <div className="App">
      <Alerts />

      <CookieConsent
        enableDeclineButton
        buttonText="J'accepte"
        declineButtonText="Je refuse"
      >
        Ce site utilise des cookies pour améliorer votre expérience.
      </CookieConsent>

      <Router>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route component={DefaultContainer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
