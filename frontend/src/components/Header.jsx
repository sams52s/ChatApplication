import React, { Component } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import { withRouter } from 'react-router-dom';
import Logo from './images/React-icon.svg';

class Header extends Component {
    
    render() { 

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
                <Button className='me-3' align='right' variant="primary" href='/login'><i className="bi bi-box-arrow-in-right" />{' '}Login</Button>
            </Navbar>
            
        );
    }
}
 
export default Header;