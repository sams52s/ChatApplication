import React from 'react';
import GoogleLogin from 'react-google-login';
// import { withRouter } from 'react-router-dom';
import UserService from '../services/UserService';


function GoogleButton(props) {

    const responseGoogle = (response) => {
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
        props.login_storeUser(response.profileObj.email);
    }

    const errorReport = (response) => {
        console.log(response);
    }

    return ( <div align='center'>
            <GoogleLogin
                clientId="56680496624-gkhmrlnuq8i5ouru4m842l6tji4lggv7.apps.googleusercontent.com"
                buttonText='Login with Google'
                onSuccess={responseGoogle}
                onFailure={errorReport}
                cookiePolicy={'single_host_origin'}
            />        
        </div> );
}

export default GoogleButton;