import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './Home';
import Login from './components/Login';
import Header from './components/Header';
import App from './components/App';
import UserService from './services/UserService';

class Main extends Component {

    componentDidMount() {
        
        if (sessionStorage.getItem("user_id") !== null) {
            
            let today = parseInt(Date.now());
            let expireTime = parseInt(sessionStorage.getItem("login_expiry_date"));

            if (today >= expireTime) {
                alert("Oops! Your session has timed out. Please sign in again.");
                this.logout();
            }
            else {
                UserService.getUserById(sessionStorage.getItem("user_id"))
                    .then((res) => this.setState({email: res.data.email}));
            }
        }
    }

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
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("login_expiry_date");

        console.log("Logout");
    }

    render() { 
        return (
            <main className='Main'>
                <Header main_getEmail={this.getEmail} main_logout={this.logout} />
                <BrowserRouter>
                        
                    <Routes>
                        <Route exact path="/" element={<Home main_getEmail={this.getEmail} />} />
                        <Route path="/login" element={<Login main_setEmail={this.setEmail} main_getEmail={this.getEmail} />} />
                        <Route path="/app" element={<App main_getEmail={this.getEmail} />} />
                    </Routes>
                    
                </BrowserRouter>
            </main>
            
        );
    }
}
 
export default Main;