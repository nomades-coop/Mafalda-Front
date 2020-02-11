import React from "react";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";

class ProductForm extends Form {
    state = {
        data: {
            name: "",
            title: "",
            brand: "",
            product_code: "",
            wholesaler_code: "",
            iibb: "",
            list_price: "",
            surcharge: "",
            iva_percentage: ""
            // picture: "",
        },
        errors: {}
    };

    async componentDidMount() {
        const prodId = this.props.match.params.id;
        if (typeof prodId === "undefined") return;

        const product = await http.get(
            config.apiEndpointProduct + prodId + "/"
        );
        console.log(product.data.name);
        if (!product) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(product) });
    }

    mapToViewModel(product) {
        return {
            name: product.data.name,
            title: product.data.title,
            brand: product.data.brand,
            product_code: product.data.product_code,
            wholesaler_code: product.data.wholesaler_code,
            iibb: product.data.iibb,
            list_price: product.data.list_price,
            surcharge: product.data.surcharge,
            iva_percentage: product.data.iva_percentage
        };
    }

    // handleAdd = async () => {
    //     const obj = { name: "a", iva: "21" };
    //     const { data: product } = await http.post(
    //         config.apiEndpointProduct,
    //         obj
    //     );

    //     const products = [product, ...this.state.products];
    //     this.setState({ products });
    // };

    doSubmit() {
        fetch(config.apiEndpointProduct, {
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
        this.props.history.push("/productos");
    }

    // doSubmit = async () => {
    //     try {
    //         const { info: product } = await http.post(
    //             config.apiEndpointProduct,
    //             this.state.data
    //         );
    //         const data = [product, ...this.state.data];
    //         this.setState({ data });
    //         this.props.history.push("/products");
    //     } catch (e) {
    //         console.log(e.response.data);
    //     }
    // };

    render() {
        return (
            <div>
                <h1 className="m-3">Nuevo/modificar Producto</h1>
                <form onSubmit={this.handleSubmit} className="m-3">
                    {this.renderInput("name", "Nombre", "Nombre del producto")}
                    {this.renderInput(
                        "title",
                        "Título",
                        "Título del producto"
                    )}
                    {this.renderInput("brand", "Marca", "Marca del producto")}
                    {this.renderInput(
                        "product_code",
                        "Código del Producto",
                        "Código del producto"
                    )}
                    {this.renderInput(
                        "wholesaler_code",
                        "Código del wholesaler",
                        "Código del wholesaler"
                    )}
                    {this.renderInput(
                        "iibb",
                        "Ingresos Brutos",
                        "Ingresos Brutos"
                    )}
                    {this.renderInput("list_price", "Precio de lista", "$")}
                    {this.renderInput("surcharge", "Recargo", "%", "number")}
                    {this.renderInput(
                        "iva_percentage",
                        "Porcentaje de iva",
                        "%",
                        "number"
                    )}
                </form>
                <button
                    onClick={() => this.doSubmit()}
                    className="btn btn-primary"
                >
                    Enviar
                </button>
            </div>
        );
    }
}

export default ProductForm;
