import React from "react";

const ClientDetails = ({ match, history }) => {
    return (
        <div>
            <h1>Detalle del cliente {match.params.id} </h1>
            <button
                className="btn btn-primary"
                onClick={() => history.push("/clientes")}
            >
                Volver al listado de clientes
            </button>
        </div>
    );
};

export default ClientDetails;
