import React from "react";
import Joi from "joi-browser";
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
            // company: "",
            // picture: "",
            // final_price: "",
            // active: "",
        },
        errors: {}
    };

    // schema = {
    //     name: Joi.string()
    //         .required()
    //         .label("Nombre del producto"),
    //     title: Joi.string()
    //         .required()
    //         .label("Título"),
    //     brand: Joi.string()
    //         .required()
    //         .label("Marca"),
    //     product_code: Joi.number()
    //         .integer()
    //         .label("Código del producto"),
    //     wholesaler_code: Joi.number()
    //         .integer()
    //         .label("Código"),
    //     iibb: Joi.number()
    //         .integer()
    //         .label("Ingresos Brutos"),
    //     list_price: Joi.number()
    //         .precision(2)
    //         .label("Precio de lista"),
    //     surcharge: Joi.number()
    //         .max(100)
    //         .integer()
    //         .label("Porcentaje del recargo"),
    //     iva_percentage: Joi.number()
    //         .max(100)
    //         .integer()
    //         .label("Porcentaje de iva")
    // };

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

    doSubmit = async () => {
        try {
            const { info: product } = await http.post(
                config.apiEndpointProduct,
                this.state.data
            );
            const data = [product, ...this.state.data];
            this.setState({ data });
            this.props.history.push("/products");
        } catch (e) {
            console.log(e.response.data);
        }
    };

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
                    {this.renderInput(
                        "Porcentaje del recargo",
                        "Recargo",
                        "%"
                    )}
                    {this.renderInput(
                        "iva_percentage",
                        "Porcentaje de iva",
                        "%"
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
