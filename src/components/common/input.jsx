import React from "react";

// ...rest trae el resto de los atributos que eran placeholder={placeholder}
// cada vez q le queria agregar uno en algun formulario, habia que cambiarlo aca tambien.
// ahora solo toma los que nose llaman igual el key:value
const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
