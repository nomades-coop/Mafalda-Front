import React, { Component, setState } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";

class ClientForm extends Form {
    state = {
        data: {
            name_bussinessname: "",
            commercial_address: "",
            cuit: "",
            iva_condition: "",
            sale_condition: ""
        },
        errors: {},
        value: ""
    };

    // schema = {
    //     date: Joi.date()
    //         .required()
    //         .label("Fecha de emisión"),
    //     // los dos que siguen son con opciones traidas del back
    //     client: Joi.string()
    //         .required()
    //         .label("Cliente"),
    //     items: Joi.string()
    //         .required()
    //         .label("Items"),
    //     discount: Joi.number()
    //         .integer()
    //         .label("Descuento")
    // };

    async componentDidMount() {
        const clientId = this.props.match.params.id;
        if (typeof clientId === "undefined") return;

        const client = await http.get(
            config.apiEndpointClient + clientId + "/"
        );
        if (!client) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(client) });
    }

    mapToViewModel(client) {
        return {
            date: client.data.name_bussinessname,
            client: client.data.commercial_address,
            items: client.data.cuit,
            discount: client.data.iva_condition,
            discount: client.data.sale_condition
        };
    }

    doSubmit = async () => {
        const { info: client } = await http.post(
            config.apiEndpointClient,
            this.state.data
        );
        const data = [client, ...this.state.data];
        this.setState({ data });
        this.props.history.push("/clientes");
    };

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    // onChange = {(event) => setValue(event.target.value)}

    render() {
        return (
            <div>
                <h1 className="m-3"> Clientes</h1>
                <form onSubmit={this.handleSubmit} className="m-3">
                    {this.renderInput(
                        "name_bussinessname",
                        "Nombre",
                        "Nombre del Cliente"
                    )}

                    {this.renderInput(
                        "commercial_address",
                        "Dirección",
                        "Dirección comercial"
                    )}

                    {this.renderInput(
                        "cuit",
                        "CUIT",
                        "Ingrese el CUIT del cliente"
                    )}
                    <div className="form-group">
                        <label>Condición frente al IVA</label>
                        <select
                            className="form-control"
                            // value={this.state.selectValue}
                            onChange={this.handleChange}
                        >
                            <option value="INS">Inscripto</option>
                            <option value="EXC">Exento</option>
                            <option value="CFI">Consumidor Final</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Condición de VENTA</label>
                        <select
                            className="form-control"
                            // value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <option value="CTD">Contado</option>
                            <option value="CCT">Cuenta Corriente</option>
                        </select>
                    </div>
                </form>
                {this.renderButton("Enviar")}
            </div>
        );
    }
}

export default ClientForm;
