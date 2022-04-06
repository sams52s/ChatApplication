import React, { Component } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import UserService from '../services/UserService';
import GoogleButton from './GoogleButton';
import UserIcon from './images/user_icon.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputEmail: "",
            inputPwd: "",
            showErrorAlert: false,  // true false
            errorMessage: ""
        }
    }

    errorAlert = () => {

        if (this.state.showErrorAlert) {

            return (<Alert variant="danger">
                <Alert.Heading>ERROR:</Alert.Heading>
                
                {this.state.errorMessage}
                
            </Alert>);
        }
    }

    authenticate = (email) => {
        this.props.main_setEmail(email);
        this.props.main_setName();
        this.props.history.push("/app");
    }

    cancel = () => {
        this.props.history.push("/");
    } 

    handleSubmit = (event) => {

        event.preventDefault();
        const { inputEmail, inputPwd } = this.state;

        // If unauthorized, catch the error
        UserService.loginCheckStatus(inputEmail, inputPwd)
            .then(() => {
                this.setState({showErrorAlert: false});
                console.log("Email: "+inputEmail);
                console.log("Password: "+inputPwd);
            })
            .catch((e) => this.setState({showErrorAlert: true, errorMessage: e.response.data.message}));
        
    }

    
    render() { 
        return (
            <div align='center'>
            <Card style={{ width: '30rem', backgroundColor: '#d6edf5' }} className='p-2 m-5' align='left'>
                <Card.Body>
                    <Card.Title align='center'><h1>Login</h1></Card.Title>
                    <br />
                    <Card.Text align='center'>
                        <img src={UserIcon} alt='User Icon' width='180' height='180' /> 
                    </Card.Text>

                    {this.errorAlert()}
                    
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={this.state.inputEmail}
                            onChange={(e) => this.setState({inputEmail: e.target.value})} />

                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.inputPwd}
                            onChange={(e) => this.setState({inputPwd: e.target.value})} />
                        </Form.Group>

                        <Button variant="secondary" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    <hr />
                    <Card.Text align='center'>
                        New User? <Link to='#'>Create an account</Link>
                    </Card.Text>
                    <GoogleButton />
                    <Button onClick={this.cancel}>Cancel</Button>
                </Card.Body>
            </Card>
            </div>
        );
    }
}
 
export default withRouter(Login);