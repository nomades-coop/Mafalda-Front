import React from "react";

const ProductDetails = ({ match, history }) => {
    return (
        <div>
            <h1>Detalle del producto {match.params.id} </h1>
            <button
                className="btn btn-primary"
                onClick={() => history.push("/products")}
            >
                Volver al listado de productos
            </button>
        </div>
    );
};

export default ProductDetails;
