import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './Home';
import Login from './components/Login';
import Header from './components/Header';
import UserService from './services/UserService';
import App from './components/App';

class Main extends Component {

    state = {
        email: "anonymous@live.com",
        fullName: undefined
    }

    getEmail = () => {
        return this.state.email;
    }

    getName = () => {
        return this.state.fullName;
    }

    setEmail = (input) => {
        this.setState({email: input});
    }

    setName = () => {
        if (this.state.email !== null) {
            UserService.getUserName(this.state.email, true)
                .then((res) => this.setState({fullName: res.data}));
        }

        // UserService.getUserName(this.state.email, true)
        //     .then((res) => console.log(res.data));
    }

    render() { 
        return (
            <main className='Main'>
                <Router>
                    <div>
                        <Header />
                    
                        <Switch>
                            <Route exact path="/"><Home main_setEmail={this.setEmail} /></Route>
                            <Route path="/login"><Login main_setEmail={this.setEmail} main_setName={this.setName} /></Route>
                            <Route path="/app"><App main_getName={this.getName} main_getEmail={this.getEmail} /></Route>
            
                        </Switch>
                    </div>
                </Router>
            </main>
            
        );
    }
}
 
export default Main;