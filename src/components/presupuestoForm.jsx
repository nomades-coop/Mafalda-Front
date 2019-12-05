import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";
// import Presupuestos from "./presupuestos";

class PrespuestoForm extends Form {
    state = {
        data: {
            date: "",
            client: "",
            items: "",
            discount: ""
            // company: "",
            // picture: "",
            // final_price: "",
            // active: "",
        },
        errors: {}
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
        const presId = this.props.match.params.id;
        if (typeof presId === "undefined") return;

        const presupuesto = await http.get(
            config.apiEndpointPresupuesto + presId + "/"
        );
        // console.log(presupuesto.data.name);
        if (!presupuesto) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(presupuesto) });

        // const clients = await http.get(config.apiEndpointClient);
        // this.setState({ data[client] : clients });
    }

    mapToViewModel(presupuesto) {
        return {
            date: presupuesto.data.date,
            client: presupuesto.data.client,
            items: presupuesto.data.items,
            discount: presupuesto.data.discount
        };
    }

    doSubmit = async () => {
        const { info: presupuesto } = await http.post(
            config.apiEndpointPresupuesto,
            this.state.data
        );
        const data = [presupuesto, ...this.state.data];
        this.setState({ data });
        this.props.history.push("/presupuesto");
    };

    render() {
        return (
            <div>
                <h1 className="m-3">Presupuesto</h1>
                <form onSubmit={this.handleSubmit} className="m-3">
                    {this.renderInput(
                        "date",
                        "Fecha",
                        "Fecha del presupuesto"
                    )}
                    <div className="form-group">
                        <label>Cliente</label>
                        <select
                            className="form-control"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <option value="INS">Inscripto</option>
                            <option value="EXC">Exento</option>
                            <option value="CFI">Consumidor Final</option>
                        </select>
                    </div>
                    {this.renderInput("items", "Productos", "Productos")}
                    {this.renderInput("discount", "Descuento", "%")}
                </form>
                {this.renderButton("Enviar")}
            </div>
        );
    }
}

export default PrespuestoForm;
