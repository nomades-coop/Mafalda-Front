import React from "react";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";

class ClientForm extends Form {
    state = {
        data: {
            name_bussinessname: "",
            commercial_address: "",
            cuit: "",
            iva_condition: "",
            sale_condition: ""
        },
        errors: {}
    };

    async componentWillMount() {
        const clientId = this.props.match.params.id;
        if (typeof clientId === "undefined") {
            this.setState({
                data: {
                    name_bussinessname: "",
                    commercial_address: "",
                    cuit: "",
                    iva_condition: "INS",
                    sale_condition: "CTD"
                }
            });
            this.setState({
                form_method: "POST"
            });
            return;
        }

        const client = await http.get(
            config.apiEndpointClient + clientId + "/"
        );
        if (!client) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(client) });
        this.setState({
            form_method: "PUT"
        });
        config.apiEndpointClient += clientId + "/";
        // this.props.selected = this.mapToViewModel(client).iva_condition
    }

    mapToViewModel(client) {
        return {
            id: client.data.id,
            name_bussinessname: client.data.name_bussinessname,
            commercial_address: client.data.commercial_address,
            cuit: client.data.cuit,
            iva_condition: client.data.iva_condition,
            sale_condition: client.data.sale_condition
        };
    }

    doSubmit() {
        fetch(config.apiEndpointClient, {
            method: this.state.form_method,
            body: JSON.stringify(this.state.data),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => {
                console.log(response.status, response);
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    // let error = new Error(response.statusText);
                    // error.response = response.json();
                    // throw error;
                    return response.json();
                }
            })
            .then(errors => {
                if (errors) {
                    toast.error("Se produjo un siguiente error", errors);
                    this.setState({ errors });
                    console.log("errors", errors);
                }
            });
        // this.props.history.push("/clientes");
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ data: { [name]: value } });
    }

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
                    {this.renderSelect(
                        "iva_condition",
                        "Condición frente al IVA",
                        [
                            { value: "INS", name: "Inscripto" },
                            { value: "EXC", name: "Exento" },
                            { value: "CFI", name: "Consumidor Final" }
                        ],
                        "iva_condition"
                    )}
                    {this.renderSelect(
                        "sale_condition",
                        "Condición de VENTA",
                        [
                            { value: "CTD", name: "Contado" },
                            { value: "CCT", name: "Cuenta Corriente" }
                        ],
                        "sale_condition"
                    )}
                    {/* <div className="form-group">
                        <label>Condición frente al IVA!</label>
                        <select
                            name="iva_condition"
                            className="form-control"
                            // value={this.state.selectValue}
                            onChange={this.handleChange}
                        >
                            <option value="INS" selected>
                                Inscripto
                            </option>
                            <option value="EXC">Exento</option>
                            <option value="CFI">Consumidor Final</option>
                        </select>
                    </div> */}
                    {/* <div className="form-group">
                        <label>Condición de VENTA</label>
                        <select
                            name="sale_condition"
                            className="form-control"
                            // value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <option value="CTD" selected>
                                Contado
                            </option>
                            <option value="CCT">Cuenta Corriente</option>
                        </select>
                    </div> */}
                </form>
                {this.renderButton("Enviar")}
            </div>
        );
    }
}

export default ClientForm;
