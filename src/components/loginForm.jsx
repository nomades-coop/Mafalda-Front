import React from "react";
import Joi from "joi-browser";
import form from "./common/form";

class LoginForm extends form {
    // data tiene que estar en todos los formularios. Iniicializarlo asi
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };
    // especificar el schema(campos del formulario pa validaciones)
    schema = {
        username: Joi.string()
            .required()
            .label("Usuario"),
        password: Joi.string()
            .required()
            .label("Contraseña")
    };
    // determina que pasa cuando se manda el form
    doSubmit = () => {
        console.log("enviado");
    };

    handleSend = () => {
        this.props.history.replace("/");
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form className="m-3" onSubmit={this.handleSubmit}>
                    {this.renderInput(
                        "username",
                        "Usuario",
                        "Ingrese su nombre de usuario"
                    )}
                    {this.renderInput(
                        "password",
                        "Contraseña",
                        "Ingrese su contraseña",
                        "password"
                    )}
                    {this.renderButton("Enviar")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
