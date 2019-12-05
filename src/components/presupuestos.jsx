import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "../services/httpService";
import config from "../config.json";
import { Link } from "react-router-dom";

class Presupuestos extends Component {
    state = {
        presupuestos: []
    };

    async componentDidMount() {
        const { data: presupuestos } = await http.get(
            config.apiEndpointPresupuesto
        );
        this.setState({ presupuestos });
    }

    // handleAdd = async () => {
    //   const obj = { title: "a", body: "b" };
    //   const { data: presupuesto } = await http.post(config.apiEndpointPresupuesto, obj);

    //   const presupuestos = [presupuesto, ...this.state.presupuestos];
    //   this.setState({ presupuestos });
    // };

    handleUpdate = async presupuesto => {
        presupuesto.title = "UPDATED";
        await http.put(
            config.apiEndpointPresupuesto + "/" + presupuesto.id,
            presupuesto
        );

        const presupuestos = [...this.state.presupuestos];
        const index = presupuestos.indexOf(presupuesto);
        presupuestos[index] = { ...presupuesto };
        this.setState({ presupuestos });
    };

    handleDelete = async presupuesto => {
        presupuesto.active = "false";
        await http.patch(
            config.apiEndpointPresupuesto + presupuesto.id + "/",
            { active: presupuesto.active }
        );
        const presupuestos = this.state.presupuestos.filter(
            p => p.active !== "false"
        );
        this.setState({ presupuestos });
    };

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <Link
                    to={`/presupuestos/nuevo`}
                    className="btn btn-primary m-2"
                    style={{ marginBottom: 20 }}
                >
                    Nuevo presupuesto
                </Link>
                <table className="table m-4">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Precio final</th>
                            <th>% de descuento</th>
                            <th>Modificar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.presupuestos.map(presupuesto => (
                            <tr key={presupuesto.id}>
                                <td>
                                    <Link
                                        to={`/presupuesto/${presupuesto.id}`}
                                    >
                                        {presupuesto.date}
                                    </Link>
                                </td>
                                <td>{presupuesto.client}</td>
                                {/* <td>{presupuesto.client.name_bussinessname}</td> */}
                                <td>{presupuesto.total_after_discounts}</td>
                                <td>{presupuesto.discount}</td>
                                <td>
                                    <Link
                                        to={`/presupuestos/modificar/${presupuesto.id}`}
                                        className="btn btn-info btn-sm"
                                    >
                                        Modificar
                                    </Link>
                                </td>
                                {/* <td>
                            <button
                            className="btn btn-info btn-sm"
                            onClick={() => this.handleUpdate(presupuesto)}>
                            Modificar
                            </button>
                        </td> */}
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            this.handleDelete(presupuesto)
                                        }
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Presupuestos;
