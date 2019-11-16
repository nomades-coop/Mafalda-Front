import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";
import http from "../services/httpService";
import config from "../config.json";

class Products extends Component {
    state = {
        products: []
    };

    async componentDidMount() {
      const { data: products } = await http.get(config.apiEndpointProduct);
      this.setState({ products });
    }

    handleAdd = async () => {
      const obj = { name: "a", iva: "21" };
      const { data: product } = await http.post(config.apiEndpointProduct, obj);

      const products = [product, ...this.state.products];
      this.setState({ products });
    };

    handleUpdate = async product => {
      product.name = "UPDATED";
      await http.put(config.apiEndpointProduct + product.id + '/', product);

      const products = [...this.state.products];
      const index = products.indexOf(product);
      products[index] = { ...product };
      this.setState({ products });
    };

    handleDelete = async product => {
        product.active = "false";
        await http.patch(config.apiEndpointProduct + product.id + '/', {active: product.active});
        const products = this.state.products.filter(p => p.active !== 'false');
        this.setState({products})
    }

    render() { 
        return ( 
            <React.Fragment>
                <ToastContainer />
                <button className="btn btn-primary m-2" onClick={this.handleAdd}>
                    Nuevo producto
                </button>
                <table className="table m-4">
                    <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>Código del producto</th>
                        <th>Precio final</th>
                        <th>activo?</th>
                        <th>Actualizar</th>
                        <th>Borrar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map(product => (
                        <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.product_code}</td>
                        <td>{product.final_price}</td>
                        <td>
                            <button
                            className="btn btn-info btn-sm"
                            onClick={() => this.handleUpdate(product)}
                            >
                            Actualizar
                            </button>
                        </td>
                        <td>
                            <button
                            className="btn btn-danger btn-sm"
                            onClick={() => this.handleDelete(product)}
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
 
export default Products;