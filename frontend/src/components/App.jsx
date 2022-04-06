import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false
        }
    }
    
    render() { 
        return (
            <div className='App'>
                <p>{this.props.main_getName()}</p>
                <p>{this.props.main_getEmail()}</p>
            </div>
        );
    }
}
 
export default App;