import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './Home';
import Login from './components/Login';
import Header from './components/Header';
import App from './components/App';

class Main extends Component {

    state = {
        email: null
    }

    getEmail = () => {
        return this.state.email;
    }

    setEmail = (input) => {
        this.setState({email: input});
        console.log("Email changed to: "+input);
    }

    logout = () => {
        this.setState({email: null});
        console.log("Logout");
    }

    render() { 
        return (
            <main className='Main'>
                <Header main_getEmail={this.getEmail} main_logout={this.logout} />
                <BrowserRouter>
                        
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login main_setEmail={this.setEmail} />} />
                        <Route path="/app" element={<App main_getEmail={this.getEmail} />} />
                    </Routes>
                    
                </BrowserRouter>
            </main>
            
        );
    }
}
 
export default Main;