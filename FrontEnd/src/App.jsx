import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './Home';
import Login from './components/Login';
import ChatApp from './components/ChatApp';
import Registration from './components/Registration';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            name: undefined
        }
    }

    setEmail = (input) => {
        this.setState({email: input});
    }

    getEmail = () => {
        return this.state.email;
    }

    setName = (input) => {
        this.setState({name: input});
    }

    getName = () => {
        return this.state.name;
    }

    logout = () => {
        this.setState({email: null});
    }
    
    render() { 
        return (
            <Router>
                <div>
                    <Navbar app_getEmail={this.getEmail} app_logout={this.logout} />
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route path="/login"><Login app_setEmail={this.setEmail} /></Route>
                        <Route path="/messages"><ChatApp app_getEmail={this.getEmail} /></Route>
                        <Route path="/register"><Registration app_setEmail={this.setEmail}/></Route>
                    </Switch>
                </div>
            
            </Router>
        );
    }
}
 
export default App;