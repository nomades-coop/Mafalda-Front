import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Products from "./components/products";
import Presupuestos from "./components/presupuestos";
import Clients from "./components/clients";
import PresupuestoForm from "./components/presupuestoForm";
import ProductForm from "./components/productForm";
import ClientForm from "./components/clientForm";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import HomePage from "./components/homePage";
import ProductDetails from "./components/productDetails";
import PresupuestoDetails from "./components/presupuestoDetails";
import ClientDetails from "./components/clientDetails";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="content">
                    <Switch>
                        <Route
                            path="/productos/modificar/:id"
                            exact
                            component={ProductForm}
                        />
                        <Route
                            path="/presupuestos/modificar/:id"
                            exact
                            component={PresupuestoForm}
                        />
                        <Route
                            path="/clientes/modificar/:id"
                            exact
                            component={ClientForm}
                        />
                        <Route
                            path="/productos/nuevo"
                            exact
                            component={ProductForm}
                        />
                        <Route
                            path="/presupuestos/nuevo"
                            exact
                            component={PresupuestoForm}
                        />
                        <Route
                            path="/clientes/nuevo"
                            exact
                            component={ClientForm}
                        />
                        <Route
                            path="/productos/:id"
                            exact
                            component={ProductDetails}
                        />
                        <Route
                            path="/presupuestos/:id"
                            exact
                            component={PresupuestoDetails}
                        />
                        <Route
                            path="/clientes/:id"
                            exact
                            component={ClientDetails}
                        />
                        <Route path="/productos" component={Products} />
                        <Route path="/presupuestos" component={Presupuestos} />
                        <Route path="/clientes" component={Clients} />
                        <Route path="/not-found" component={NotFound} />
                        <Route path="/login" exact component={LoginForm} />
                        <Route path="/" exact component={HomePage} />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
