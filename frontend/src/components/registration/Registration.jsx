import React, { useState } from 'react';
import { Card, Form, Row, 
    Col, Button, InputGroup, 
    FormControl, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import GoogleButton from '../GoogleButton';

function Registration(props) {

    // States
    const [formFirstName, setFormFirstName] = useState("");
    const [formLastName, setFormLastName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [pwd1, setPwd1] = useState("");
    const [pwd2, setPwd2] = useState("");

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("I don't know what went wrong.");

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // Toggle Show/Hide Password
    const toggleShowHide1 = () => {
        setShowPassword1(!showPassword1);
    }

    const toggleShowHide2 = () => {
        setShowPassword2(!showPassword2);
    }

    // Password in the field
    const hidden = (isConfPwd) => {
        if (isConfPwd) {
            return showPassword2 ? "text" : "password";
        }
        else {
            return showPassword1 ? "text" : "password";
        }
    }

    // Eye in the toggle button
    const eye = (isConfPwd) => {
        
        if (isConfPwd) {
            return showPassword2 ? (<i className="bi bi-eye-fill" />) : (<i className="bi bi-eye-slash" />);
        }
        else {
            return showPassword1 ? (<i className="bi bi-eye-fill" />) : (<i className="bi bi-eye-slash" />);
        }
    }

    // Error Alert Box
    const errorAlert = () => {
        if (showError) {
            return (<Alert variant="danger">
                <Alert.Heading>ERROR:</Alert.Heading>
                {errorMessage}
            </Alert>);
        }
    }

    const confirmationAlert = () => {

        return loading ? (
            
            <div align='center'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>

            ) : (

            <Alert variant="info">
                <Alert.Heading>Confirmation email sent</Alert.Heading>
                A confirmation email has been sent to <b>{formEmail}</b>. 
                Please confirm by clicking the link in the email before it expires 
                in 15 minutes.<br/>
                <br/>You may close this page.
                
            </Alert>);
    }

    // When the 'submit' button is hit
    const handleSubmit = (event) => {
        event.preventDefault();

        let user = {
            firstName: formFirstName,
            lastName: formLastName,
            email: formEmail,
            password: pwd1
        }

        if (pwd1 !== pwd2) {
            setErrorMessage("Passwords do not match");
            setShowError(true);
        }
        else {
            setShowError(false);
            setLoading(true);
            setSubmitted(true);

            UserService.createUser(user)
            .then(() => {
                setLoading(false);
            })
            .catch((e) => {
                setShowError(true);
                setSubmitted(false);
                setErrorMessage(e.response.data.message);
            });
        }
    }

    // This is for Google Login
    const storeUserId = (email) => {
        setShowError(false);

        UserService.getIdByEmail(email)
            .then((res) => {
                sessionStorage.setItem("user_id", res.data);
                props.setUserId(res.data);
            });

        let date = new Date();
        date.setDate(date.getDate()+2);
        sessionStorage.setItem("login_expiry_date", date.getTime()); // Expires after 2 days
        
        navigate('/app');
    }

    return (
        <div align='center'>
            <Card style={{ width: '50rem', backgroundColor: '#f5f5f5' }} className='p-3 m-5' align='left'>
                <Card.Body>
                    
                    <Card.Title align='center'><h1>Sign Up</h1></Card.Title>
                    
                    {!submitted ? (
                        <Card.Text className='text-muted'><br />Please fill out all your information to register.</Card.Text>
                    ) : (
                        <br />
                    )}

                    {errorAlert()}

                    {submitted ? (
                        <div>
                            {confirmationAlert()}
                        </div>
                    ) : (
                    <Form onSubmit={handleSubmit}>
                        {/* FULL NAME */}
                        <Row className="mb-3">

                            {/* FIRST NAME */}
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" required={true}
                                value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)} />
                            </Form.Group>
                            
                            {/* LAST NAME */}
                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" required={true}
                                value={formLastName} onChange={(e) => setFormLastName(e.target.value)} />
                            </Form.Group>

                        </Row>

                        {/* E-MAIL ADDRESS */}
                        <Form.Group className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="abc123@example.com" required={true} 
                            value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
                        </Form.Group>

                        {/* PASSWORD */}
                        <Row className="mb-3">

                            {/* NEW PASSWORD */}
                            <Form.Group as={Col} controlId="formGridPassword1">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-2">
                                    <FormControl type={hidden(false)} placeholder="Password" required={true}
                                    value={pwd1} onChange={(e) => setPwd1(e.target.value)} />
                                    <InputGroup.Text onClick={toggleShowHide1}>{eye(false)}</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            {/* CONFIRM PASSWORD */}
                            <Form.Group as={Col} controlId="formGridPassword2">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup className="mb-2">
                                    <FormControl type={hidden(true)} placeholder="Password" required={true} 
                                    value={pwd2} onChange={(e) => setPwd2(e.target.value)} />
                                    <InputGroup.Text onClick={toggleShowHide2}>{eye(true)}</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                        </Row>

                        {/* SUBMIT BUTTON */}
                        <div>
                            <Button variant="primary" type="submit" className='m-1'>
                                Submit
                            </Button>
                        </div>
                        <hr />
                    </Form> )
                    }

                    {!submitted ? (
                        <Card.Text align='center'>Already registered? <Link to='/login'>Please sign in</Link>.</Card.Text>
                    ) : (
                        <></>
                    )}

                    {!submitted ? (
                        <GoogleButton storeUserId={storeUserId} />
                    ) : (
                        <></>
                    )}

                </Card.Body>
            </Card>
        </div>
    );
}

export default Registration;