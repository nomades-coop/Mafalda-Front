import React from "react";

const PresupuestoDetails = ({ match, history }) => {
    return (
        <div>
            <h1>Detalle del presupuesto {match.params.id} </h1>
            <button
                className="btn btn-primary"
                onClick={() => history.push("/presupuestos")}
            >
                Volver al listado de presupuestos
            </button>
        </div>
    );
};

export default PresupuestoDetails;
