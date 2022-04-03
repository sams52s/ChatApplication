import React, { Component } from 'react';
import UserService from '../services/UserService';
import Logo from './images/React-icon.svg';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.app_getEmail(),
            firstName: "",
            lastName: ""
        }
    }

    goToLogin = () => {
        this.props.history.push("/login");
    }

    loginButton = () => {

        if (this.state.email === null) {
            return (<button type='button' align='right' className='btn btn-primary' onClick={this.goToLogin}>Login</button>);
        }
        else {
            UserService.getUser(this.props.app_getEmail())
                .then((res) => {
                    this.setState({firstName: res.data.firstName, lastName: res.data.lastName});
                });
            
            return (
                <div class="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" align='right' data-bs-toggle="dropdown" aria-expanded="false">
                        {this.state.firstName} {this.state.lastName}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button class="dropdown-item" type="button">Action</button></li>
                        <li><button class="dropdown-item" type="button">Another action</button></li>
                        <li><button class="dropdown-item" type="button">Something else here</button></li>
                    </ul>
                </div>
            );
        }
    }

    render() { 
        return (
            <nav className='navbar navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='./'>
                        <img src={Logo} alt="" width="30" height="30" className="d-inline-block align-text-top me-2" />
                        Chat Application
                    </a>
                    
                </div>
            
            </nav>
        );
    }
}
 
export default withRouter(Navbar);