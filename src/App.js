import React, { Component } from "react";
import Products from './components/products';
import Presupuestos from './components/presupuestos';
import NavBar from './components/navbar';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import Login from './components/login';


class App extends Component {


    render() {
        return (
          <React.Fragment>
            <NavBar/>
            {/* <Login/> */}
            <table className="table m-4">
              <thead>
              <tr>
                  {/* <th>Presupuesto</th> */}
                  <th>Productos</th>
              </tr>
              </thead>
              <tbody>
                  {/* <td><Presupuestos/></td> */}
                  <td><Products/></td>
              </tbody>
            </table>
          </React.Fragment>
    );
  }
}

export default App;
