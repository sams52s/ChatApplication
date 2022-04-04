import React, { Component } from 'react';
import UserService from '../services/UserService';
import Logo from './images/React-icon.svg';
import { withRouter } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: undefined
        }
    }

    goToLogin = () => {
        this.props.app_logout();
        this.props.history.push("/login");
    }

    getName = () => {
        if (this.state.name === undefined) {
            UserService.getUserName(this.props.app_getEmail(), true).then((res) => console.log(res));
        }

        return this.state.name;
    }

    render() { 
        return (
            <nav className='navbar navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='./'>
                        <img src={Logo} alt="" width="30" height="30" className="d-inline-block align-text-top me-2" />
                        Chat Application
                    </a>

                    { this.props.app_getEmail() === null 
                        ? (
                            <Button align="right" variant="primary" onClick={this.goToLogin}><i className="bi bi-box-arrow-in-left me-2" />Login</Button>
                        ) : (
                            <Dropdown align='right'>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {this.getName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1"><i className="bi bi-gear-wide me-2" />Settings</Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.app_logout}><i className="bi bi-box-arrow-right me-2" />Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    )}
                </div>
            
            </nav>
        );
    }
}
 
export default withRouter(Navbar);