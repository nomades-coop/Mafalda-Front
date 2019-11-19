import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Products from "./components/products";
import Presupuestos from "./components/presupuestos";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import HomePage from "./components/homePage";
import ProductDetails from "./components/productDetails";
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
                            path="/products/:id"
                            component={ProductDetails}
                        />
                        <Route path="/products" component={Products} />
                        <Route path="/presupuestos" component={Presupuestos} />
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
