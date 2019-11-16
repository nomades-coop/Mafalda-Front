import React, { Component } from 'react';

class Login extends Component {
    state = {
        user: "",
        password : ""
        }

    onFieldChange(event) {
        this.setState ({
            [event.target.name]: event.target.value
        })
    };
    render() { 
        return ( 
            <form className="m-3">
                <div className="form-group">
                    <label For="userInput">Usuario</label>
                    <input type="text" className="form-control" id="userInput"
                        name="user" value={this.state.user} 
                        placeholder="Ingrese su nombre de usuario" onchange={this.onFieldChange}/>
                </div>
                <div className="form-group">
                    <label For="passwordInput">Usuario</label>
                    <input type="text" className="form-control" id="passwordInput"
                        name="password" value={this.state.user} 
                        placeholder="Ingrese su contraseña" onchange={this.onFieldChange}/>
                </div>
            </form>
         );
    }
}
 
export default Login;