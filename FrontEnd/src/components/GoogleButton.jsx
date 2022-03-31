import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';
import UserService from '../services/UserService';


class GoogleButton extends Component {

    responseGoogle = (response) => {
        // this.props.login_changeEmail(response.profileObj.email);
        // this.props.login_changeName(response.profileObj.givenName);
        // console.log(`Logged in with Google as ${response.profileObj.name}`);
        // this.props.history.push("/");
        console.log(response.profileObj);
        
        let fetchedJson = {
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email
        };

        UserService.createUserWithGoogle(fetchedJson);
        this.props.login_setEmail(response.profileObj.email);
        this.props.history.push("/messages");
    }

    errorReport = (response) => {
        console.log(response);
    }
    
    render() { 
        return ( <div>
            <GoogleLogin
            clientId="56680496624-gkhmrlnuq8i5ouru4m842l6tji4lggv7.apps.googleusercontent.com"
            buttonText='Login with Google'
            onSuccess={this.responseGoogle}
            onFailure={this.errorReport}
            cookiePolicy={'single_host_origin'}
            />        
        </div> );
    }
}
 
export default withRouter(GoogleButton);