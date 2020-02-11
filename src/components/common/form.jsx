import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    handleSubmit = e => {
        e.preventDefault();

        // const errors = this.validate();
        // this.setState({ errors: errors || {} });
        // if (errors) return;
        console.log("boton llamado");
        this.doSubmit();
        // .then(response => {
        //     console.log(response.status, response);
        //     if (response.status >= 200 && response.status < 300) {
        //         return response;
        //     } else {
        //         var error = new Error(response.statusText);
        //         error.response = response.json();
        //         throw error;
        //     }
        // })
        // // .catch(errors => {
        // //     return errors.json();
        // // })
        // .then(errors => {
        //     console.log(errors);
        // });
    };

    handleChange = ({ currentTarget: input }) => {
        // const errors = { ...this.state.errors };
        // const errorMessage = this.validateProperty(input);
        // if (errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        // this.setState({ data, errors });
        this.setState({ data });
    };

    renderButton(label) {
        return (
            // <button disabled={this.validate()} className="btn btn-primary">
            <button onClick={this.handleSubmit} className="btn btn-primary">
                {label}
            </button>
        );
    }

    renderInput(name, label, placeholder, type = "text") {
        const { data, errors } = this.state;
        return (
            <Input
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                type={type}
                error={errors[name]}
                placeholder={placeholder}
            />
        );
    }

    renderSelect(name, label, options, selected) {
        const { data, errors } = this.state;
        return (
            <div className="form-group">
                <label>{label}</label>
                <select
                    className="form-control"
                    name={name}
                    onChange={this.handleChange}
                >
                    {options.map((e, key) => {
                        return (
                            <option
                                key={key}
                                value={e.value}
                                selected={e.value === data[selected]}
                            >
                                {e.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
}

export default Form;
