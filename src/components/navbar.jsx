import React from "react";
import { Link, NavLink } from "react-router-dom";

const navBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand mb-0 h1" to="/">
                Libreria
            </Link>
            <div className="navbar-nav">
                <NavLink className="nav-link" to="/products">
                    Productos
                </NavLink>
                <NavLink className="nav-link" to="/presupuestos">
                    Presupuestos
                </NavLink>
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
            </div>
        </nav>
    );
};

export default navBar;
