import React from 'react';


const navBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1">Libreria</span>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link">Productos</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" >Presupuestos</a>
                </li>
            </ul>
        </nav>
     );
}
 
export default navBar;