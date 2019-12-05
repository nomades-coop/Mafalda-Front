import React, { Component } from "react";

class HomePage extends Component {
    handleGoToPresupuestos = () => {
        this.props.history.push("/presupuestos");
    };
    handleGoToProducts = () => {
        this.props.history.push("/productos");
    };
    handleGoToClients = () => {
        this.props.history.push("/clientes");
    };

    render() {
        return (
            <React.Fragment>
                <button
                    className="btn btn-info m-4"
                    onClick={this.handleGoToPresupuestos}
                >
                    Presupuestos
                </button>
                <button
                    className="btn btn-info  m-4"
                    onClick={this.handleGoToProducts}
                >
                    Productos
                </button>
                <button
                    className="btn btn-info  m-4"
                    onClick={this.handleGoToClients}
                >
                    Clientes
                </button>
            </React.Fragment>
        );
    }
}

export default HomePage;
