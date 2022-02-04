import React ,{useState,useEffect} from 'react';
import axios from "axios"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { URL } from "../../../middlewares/request";
import Logo from "../../../images/logo_petit_m.png";


import "./Login.css";
// import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: "3%",
    boxShadow: " 0px 0px 5px 1px",
    //opacity:'80%',
    border: "solid #04295D",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#04295D",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    //backgroundColor:theme.palette.secondary,
  },
  disable: {
    backgroundColor: "#04295D",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  Container: {
    marginTop: 100,
  },
  input: {
    fontWeight: "bold",
  },
  main: {
    height: 800,
  },
  logo: {
    height: 150,
    marginTop: "10px",
    marginBottom: "10px",
  },
  logoContainer: {
    backgroundColor: "#04295D",
    textAlign: "center",
  },
}));
const Login = () => {
  const classes = useStyles();

  const security = useSelector((state) => state.security);
  const errors = useSelector((state) => state.errors);
  const [shoudDisableSignIn, setShoudDisableSignIn] = useState(false);
  const history = useHistory();

  const [loginState, setloginState] = useState({
    // User's connexion information
    username: "",
    password: "",
    errors: " ",
    code: 0,
  });
  const [canAuth, setCanAuth] = useState(true)
  const [loadCanAuth, setLoadCanAuth] = useState(false)
  const [auth, setAuth] = useState(false); // Show the 2FA form
  const [count, setCount] = useState(0); // To count 5 mins
  const [countCanAuth, setCountCanAuth] = useState(10); // To count 10 mins

  const updateDisponibiliteRestaurant = async (disponibilite) => {
    await axios
      .put(URL + "restaurant/info_restaurant/1/", {
        disponibilite_restaurant: disponibilite,
      })
      .then((res) => history.push("/admin"));
  };

  const fetchCanAuth = async () =>{ // Check if user can authentificate
    await axios
      .get(`${URL}accounts/canAuth/`)
      .then((res) => { setCanAuth(res.data.canAuth); setLoadCanAuth(true); console.log("CONNECT: " + res.data.canAuth)});
  }

  const authenticate = async (loginRequest) => {
    // Authentification when the user submit the code
    await axios({
      url: `${URL}accounts/verify/`,
      method: "post",
      //headers: {'Access-Control-Allow-Origin': '*'},
      data: loginRequest,
    })
      .then((res) => {
        // extract token from res.data
        const { access } = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", access);
        // set our token in header ***
        // decode token on React
        // // const decoded = jwt_decode(token);
        // dispatch to our securityReducer
        setShoudDisableSignIn(true);
        updateDisponibiliteRestaurant(true);
        fetchCanAuth()
      })
      .catch((err) => {
        console.log("HERE")
        setloginState({
          ...loginState,
          errors: "Email ou mot de passe incorrecte",
        });
        setShoudDisableSignIn(false);
        fetchCanAuth()
        console.log("=========bp=======")
        console.log(canAuth)
      });
  };

  async function askAuth(loginRequest) {
    // Asking for connexion with the username & password
    console.log(loginRequest);
    await axios({
      url: `${URL}accounts/auth/`,
      method: "post",
      //headers: {'Access-Control-Allow-Origin': '*'},
      data: loginRequest,
    })
      .then((res) => {
        setAuth(true);
        setCount(5);
        setShoudDisableSignIn(false);
        fetchCanAuth()
      })
      .catch((err) => {
        console.log(err.response.data)
        setloginState({
          ...loginState,
          errors: "Email ou mot de passe incorrecte",
        });
        setAuth(false);
        setShoudDisableSignIn(false);
        fetchCanAuth()
        console.log(canAuth)
      });
  }

  const onChange = (e) => {
    setloginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    // When the use submit username and password
    e.preventDefault();
    setShoudDisableSignIn(true);
    const loginRequest = {
      username: loginState.username,
      password: loginState.password,
    };
    askAuth(loginRequest);
    //clearTimeout(myTimeout)
  };

  const onSubmitCode = (e) => {
    // When the user submit the 2FA code
    e.preventDefault();
    setShoudDisableSignIn(true);
    const loginRequest = {
      username: loginState.username,
      password: loginState.password,
      code: loginState.code,
    };
    authenticate(loginRequest);
  };

  useEffect(() => {
    console.log("===================")
    fetchCanAuth();
    console.log(canAuth)
  }, [loadCanAuth]);

  useEffect(() => {
    // Able to connect after 10 minutes
    const timer = (!canAuth && countCanAuth > 0) && setTimeout(() => setCountCanAuth(countCanAuth - 1), 1000);
    return () => clearInterval(timer);
  }, [canAuth, countCanAuth])

  useEffect(() => {
    // Timer to resend the code
    const timer = (auth && count > 0) && setTimeout(() => setCount(count - 1), 1000*60);
    return () => clearInterval(timer);
  }, [auth, count]);

  return (
    <div className={classes.main}>
      <div className={classes.logoContainer}>
        <img src={Logo} className={classes.logo} />
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          {/* !auth ? (
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="email"
                classname={classes.input}
                label="addresse mail"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={onChange}
              />
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="password"
                label="mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
              {loginState.errors !== "" && (
                <p className={classes.error}>{loginState.errors} </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={
                  !shoudDisableSignIn ? classes.submit : classes.disable
                }
                disabled={shoudDisableSignIn}
              >
                {shoudDisableSignIn ? (
                  <div style={{ color: "brown" }}>
                    Connexion au serveur .....{" "}
                  </div>
                ) : (
                  "Connexion "
                )}
              </Button>
            </form>
          ) : (
            <form className={classes.form} noValidate onSubmit={onSubmitCode}>
              <label className="text">Le code est valide pendant : {count} minutes </label>
              {count === 0 && (
                <center>
                  <br />
                  <span
                    onClick={() => {
                      askAuth({
                        username: loginState.username,
                        password: loginState.password,
                      });
                    }}
                    className="click2FA"
                  >
                    Renvoyez moi un code !
                  </span>
                </center>
              )}
              <br />
              <h6 className="sub_title"><br />Code :</h6>
              <br />
              <input
                variant="filled"
                fullWidth
                id="dashboard-outlined-basic"
                type="number"
                name="code"
                placeholder="Code d'authentification"
                onChange={onChange}
                style={{ width: "60%" }}
              />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={
                  !shoudDisableSignIn ? classes.submit : classes.disable
                }
                disabled={shoudDisableSignIn}
              >
                {shoudDisableSignIn ? (
                  <div style={{ color: "brown" }}>
                    Connexion au serveur .....{" "}
                  </div>
                ) : (
                  "Connexion "
                )}
              </Button>
            </form>
          ) */}

          { canAuth ? (
            !auth ? (
              <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  classname={classes.input}
                  label="Nom d'utilisateur"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  onChange={onChange}
                />
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChange}
                />
                {loginState.errors !== "" && (
                  <p className={classes.error}>{loginState.errors} </p>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={
                    !shoudDisableSignIn ? classes.submit : classes.disable
                  }
                  disabled={shoudDisableSignIn}
                >
                  {shoudDisableSignIn ? (
                    <div style={{ color: "brown" }}>
                      Connexion au serveur .....{" "}
                    </div>
                  ) : (
                    "Connexion "
                  )}
                </Button>
              </form>
            ) : (
              <form className={classes.form} noValidate onSubmit={onSubmitCode}>
                <label className="text">Le code est valide pendant : {count} minutes </label>
                {count === 0 && (
                  <center>
                    <br />
                    <span
                      onClick={() => {
                        askAuth({
                          username: loginState.username,
                          password: loginState.password,
                        });
                      }}
                      className="click2FA"
                    >
                      Renvoyez moi un code !
                    </span>
                  </center>
                )}
                <br />
                <h6 className="sub_title"><br />Code :</h6>
                <br />
                <input
                  variant="filled"
                  fullWidth
                  id="dashboard-outlined-basic"
                  type="number"
                  name="code"
                  placeholder="Code d'authentification"
                  onChange={onChange}
                  style={{ width: "60%" }}
                />
                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={
                    !shoudDisableSignIn ? classes.submit : classes.disable
                  }
                  disabled={shoudDisableSignIn}
                >
                  {shoudDisableSignIn ? (
                    <div style={{ color: "brown" }}>
                      Connexion au serveur .....{" "}
                    </div>
                  ) : (
                    "Connexion "
                  )}
                </Button>
              </form>
            )
          ) : (
            <div>  <p className={classes.error}> Vous ne pouvez pas vous connectez pendant {countCanAuth} minutes </p></div>
          )}
        </div>
      </Container>
    </div>
  );
};
export default Login;
