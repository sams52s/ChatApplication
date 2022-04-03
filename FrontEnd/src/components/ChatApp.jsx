import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ChatApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false
        }
    }

    render() {

        if (this.props.app_getEmail() === null) {
            return (
                <Redirect to="/login" />
            );
        }
        
        return (<div>
                    <p>
                        {this.props.app_getEmail()}
                    </p>
            </div>);
    }
}
 
export default ChatApp;