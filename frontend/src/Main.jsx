import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './Home';
import Login from './components/Login';
import Header from './components/Header';
import Registration from './components/registration/Registration';
import ConfirmPage from './components/registration/ConfirmPage';
import App from './components/App';
import Test from './Test';

class Main extends Component {

    componentDidMount() {
        
        console.log("User ID: "+this.state.userId);
        if (sessionStorage.getItem("user_id") !== null) {
            
            let today = parseInt(Date.now());
            let expireTime = parseInt(sessionStorage.getItem("login_expiry_date"));

            if (today >= expireTime) {
                alert("Oops! Your session has timed out. Please sign in again.");
                this.logout();
            }
            else {
                this.setId(parseInt(sessionStorage.getItem("user_id")));
            }
        }
    }

    state = {
        userId: null
    }

    getId = () => {
        return this.state.userId;
    }

    setId = (input) => {
        this.setState({userId: input});
        console.log("ID changed to: "+input);
    }

    logout = () => {
        this.setState({email: null});
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("login_expiry_date");

    }

    render() { 
        return (
            <main className='Main'>
                <Header getUserId={this.getId} userLogout={this.logout} />
                <BrowserRouter>
                        
                    <Routes>
                        <Route path="/" element={<Home main_getId={this.getId} />} />
                        <Route path="login" element={<Login getUserId={this.getId} setUserId={this.setId} />} />
                        <Route path="register" element={<Registration setUserId={this.setId} />} />
                        <Route path="conf/:token" element={<ConfirmPage />} />
                        <Route path="app" element={<App getUserId={this.getId} />} />
                        <Route path="test" element={<Test />} />
                        
                    </Routes>
                    
                </BrowserRouter>
            </main>
            
        );
    }
}
 
export default Main;