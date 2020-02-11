import React from "react";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";
import update from "immutability-helper";
// import Presupuestos from "./presupuestos";

class PrespuestoForm extends Form {
    state = {
        data: {
            date: "",
            client: "",
            items: [
                { id: 1, name: "neko", selected: false },
                { id: 2, name: "galletitas", selected: false }
            ],
            discount: ""
            // picture: "",
        },
        errors: {}
    };

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

    doSubmit() {
        fetch(config.apiEndpointPresupuesto, {
            method: "POST",
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
                    this.setState({ errors });
                }
            });
        this.props.history.push("/presupuestos");
    }
    // doSubmit = async () => {
    //     const { info: presupuesto } = await http.post(
    //         config.apiEndpointPresupuesto,
    //         this.state.data
    //     );
    //     const data = [presupuesto, ...this.state.data];
    //     this.setState({ data });
    //     this.props.history.push("/presupuesto");
    // };
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ data: { [name]: value } });
    }

    addItem(event) {
        let index = event.target.name;
        let value = event.target.checked;
        console.log(event.target.checked);
        let items = update(this.state.data.items, {
            [index]: { selected: { $set: value } }
        });
        this.setState({ data: { items } });
    }

    get selected() {
        return this.state.data.items.filter(item => {
            return item.selected;
        });
    }

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
                            name="client"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            <option value="INS">item1</option>
                            <option value="EXC">item2</option>
                            <option value="CFI">item3 </option>
                        </select>
                    </div>
                    {/* {this.renderInput("items", "Items", "Agrega tus items")} */}
                    {this.selected.map(item => {
                        return <span>{item.name}</span>;
                    })}
                    {this.renderInput("discount", "Descuento", "%")}
                </form>
                {this.renderButton("Enviar")}
                {this.state.data.items.length > 0 &&
                    this.state.data.items.map((item, index) => {
                        return (
                            <label>
                                <input
                                    type="checkbox"
                                    key={item.id}
                                    onClick={this.addItem.bind(this)}
                                    name={index}
                                    checked={item.selected}
                                ></input>
                                <span>{item.name}</span>
                            </label>
                        );
                    })}
            </div>
        );
    }
}

export default PrespuestoForm;
