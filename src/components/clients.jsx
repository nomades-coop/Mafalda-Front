import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "../services/httpService";
import config from "../config.json";
import { Link } from "react-router-dom";

class Clients extends Component {
    state = {
        clients: []
    };
    async componentDidMount() {
        const { data: clients } = await http.get(config.apiEndpointClient);
        this.setState({ clients });
    }

    handleUpdate = async client => {
        client.name_bussinessname = "UPDATED";
        await http.put(config.apiEndpointClient + "/" + client.id, client);

        const clients = [...this.state.clients];
        const index = clients.indexOf(client);
        clients[index] = { ...client };
        this.setState({ clients });
    };

    handleDelete = async client => {
        client.active = "false";
        await http.patch(config.apiEndpointClient + client.id + "/", {
            active: client.active
        });
        const clients = this.state.clients.filter(p => p.active !== "false");
        this.setState({ clients });
    };
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <Link
                    to={`/clientes/nuevo`}
                    className="btn btn-primary m-2"
                    style={{ marginBottom: 20 }}
                >
                    Nuevo cliente
                </Link>
                <table className="table m-4">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Dirección</th>
                            <th>Condición de venta</th>
                            <th>Condición de IVA</th>
                            <th>Modificar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.clients.map(client => (
                            <tr key={client.id}>
                                <td>
                                    <Link to={`/cliente/${client.id}`}>
                                        {client.name_bussinessname}
                                    </Link>
                                </td>
                                <td>{client.commercial_address}</td>
                                <td>{client.sale_condition}</td>
                                <td>{client.iva_condition}</td>
                                <td>
                                    <Link
                                        to={`/clientes/modificar/${client.id}`}
                                        className="btn btn-info btn-sm"
                                    >
                                        Modificar
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            this.handleDelete(client)
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

export default Clients;
