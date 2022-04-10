import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import UserService from '../services/UserService';
import Logo from './images/React-icon.svg';


const Header = (props) => {

    const [name, setName] = useState("");

    if (props.getUserId() !== null) {
        UserService.getUserName(props.getUserId(), true)
            .then((res) => setName(res.data));
    }

    const logout = () => {
        props.userLogout();
        alert("You are logged out. Please exit the browser for added security.");
        window.location.reload(false);
    }

    return (
        
        <Navbar bg="dark" variant="dark" style={{
            background: 'rgb(2,0,36) linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(54,54,54,1) 47%, rgba(139,139,139,1) 100%)'
        }}>
            <Container align='left'>
                <Navbar.Brand href="/"><img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top"/>{' '}Chat Application</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#blog">Blog</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                
            </Container>

            { props.getUserId() === null ? (
                <Button className='me-3' align='right' variant="primary" href='/login'><i className="bi bi-key-fill" />{' '}Login</Button>
            ) : (
                <div align='right'>
                    <DropdownButton className='me-3' variant="secondary" id="user-tools" title={name}>
                        <Dropdown.Item href="#"><i className="bi bi-gear-wide" />{' '}Settings</Dropdown.Item>
                        <Dropdown.Item onClick={logout}><i className="bi bi-door-open-fill" />{' '}Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            ) }
            
        </Navbar>
        
    );
}

export default Header;