import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Card, Form, Button, Alert, CloseButton } from 'react-bootstrap';

import GoogleButton from './GoogleButton';
import UserIcon from './images/user_icon.png';
import UserService from '../services/UserService';

function Login(props) {

    const [formEmail, setFormEmail] = useState("");
    const [formPwd, setFormPwd] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    if (props.main_getEmail() !== null) {
        return (<Navigate to='/app' />);
    }

    const close = () => {
        navigate('/');
    }

    const errorAlert = () => {

        if (showAlert) {
            return (<Alert variant="danger">
                <Alert.Heading>ERROR:</Alert.Heading>
                {errorMessage}
            </Alert>);
        }
    }

    const storeUser = (email) => {
        setShowAlert(false);

        UserService.getUser(email)
            .then((res) => sessionStorage.setItem("user_id", res.data.id));

        let date = new Date();
        date.setDate(date.getDate()+2);
        sessionStorage.setItem("login_expiry_date", date.getTime()); // Expires after 2 days
        
        props.main_setEmail(email);
        navigate("/app");
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        UserService.authenticate(formEmail, formPwd)
            .then(() => {
                console.log("Login successful!");
                storeUser(formEmail);
            })
            .catch((e) => {
                setShowAlert(true);
                setErrorMessage(e.response.data.message);
            });
    };

    return (
        <div align='center'>
        <Card style={{ width: '30rem', backgroundColor: '#d6edf5' }} className='p-3 m-5' align='left'>
            <CloseButton onClick={close}/>
            <Card.Body>
                <Card.Title align='center'><h1>Login</h1></Card.Title>
                <br />
                <Card.Text align='center'>
                    <img src={UserIcon} alt='User Icon' width='180' height='180' /> 
                </Card.Text>

                {errorAlert()}
                
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />

                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                        value={formPwd} onChange={(e) => setFormPwd(e.target.value)} />
                    </Form.Group>

                    <Button variant="secondary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
                <hr />
                <Card.Text align='center'>
                    New User? <Link to='#'>Create an account</Link>
                </Card.Text>
                <GoogleButton login_storeUser={storeUser}/>
            </Card.Body>
        </Card>
        </div>
    );
}

export default Login;