import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserService from '../services/UserService';
//import UserService from '../services/UserService';
import checkmark from './images/checkmark.png';
import crossmark from './images/crossmark.png';

class ConfirmedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorCaught: false,
            errorMessageFromServer: null,
            token: this.props.match.params.token,
            loading: false,
            showApprovedMsg: false
        }
    }

    statusImage() {

        const { errorCaught } = this.state;

        return (
            <div className="text-center p-4">
                { errorCaught ? (
                    <img src={crossmark} alt='Cross Mark' width='150' height='150' />
                ) : (
                    <img src={checkmark} alt='Check Mark' width='150' height='150' />
                )
            }
                    
            </div>
        );
    }

    ApprovedBox() {

        const { loading } = this.state;

        if (this.state.showApprovedMsg) {
            
            return (
                <div className="card border-primary mb-3">
                    
                    <div className="card-body text-primary">
                        { loading ? (
                            <div className="spinner-border" align="center" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> ) : (
                            
                            <div>
                                <h5 className="card-title">Email resent</h5>
                                <p className="card-text" align="left">We have resent your confirmation mail. Please check your inbox.</p>
                            </div>
                            )
                        }

                    </div>
                </div>
            );
        }
    }

    title = () => {
        const { errorCaught } = this.state;
        return ( errorCaught ? "Oops... Something went wrong!" : "Confirmation successful!" );
    }

    body = () => {
        const { errorCaught } = this.state;
        
        if (errorCaught) {

            let message = "";
            switch (this.state.errorMessageFromServer) {
                case "token expired":
                    message += "Your confirmation token has expired. Get your email resent, and confirm again.";
                    break;

                case "email already confirmed":
                    message += "Your account has already been confirmed. You can still go back to your login page and sign in with your account.";
                    break;
                    
                case "token not found":
                    message += "Looks like this token is not found in the server. Please contact your administrator to get you reregistered.";
                    break;
                
                default:
                    message += this.state.errorMessageFromServer;
            }
            return message;

        }
        else {
            return "Your registration is complete! To access your account, please login using your email and password.";
        }
    }

    goToLogin = () => {
        this.props.history.push("/login");
    }

    goToHomepage = () => {
        this.props.history.push("/");
    }

    resend = () => {
        const { token } = this.state;
        this.setState({loading: true, showApprovedMsg: true});
        UserService.resendMail(token).then(this.setState({loading: false}));
    }

    

    buttons = () => {

        if (this.state.errorMessageFromServer === "token expired") {
            return (
                <div>
                    <button type="button" className='btn btn-warning m-2' onClick={this.resend}>Resend Email</button>
                    
                </div>
            );
        }

        else if (this.state.errorMessageFromServer === "email already confirmed" || this.state.errorMessageFromServer === null) {
            return (
                <div>
                    <button type="button" className='btn btn-primary m-2' onClick={this.goToLogin}>Login</button>
                    <button type="button" className='btn btn-secondary m-2' onClick={this.goToHomepage}>Back to Homepage</button>
                </div>
            );
        }
        else if (this.state.errorMessageFromServer === "token not found") {
            return (
                <div>
                    <button type="button" className='btn btn-secondary m-2' onClick={this.goToHomepage}>Back to Homepage</button>
                </div>
            );
        }

        else {
            return (
                <div>
                    <button type="button" className='btn btn-secondary m-2' onClick={this.goToHomepage}>Back to Homepage</button>
                </div>
            );
        }
    }
    
    componentDidMount() {
        UserService.confirmToken(this.state.token)
        .catch((e) => this.setState({errorCaught: true, errorMessageFromServer: e.response.data.message}));
    }

    render() { 
        return (
            <div align="center" className='p-1'>
                <br /><br /><br /><br /><br /><br /><br />
            <div className="card" style={{width: "500px"}}>
                <div className="card-body">
                    <h5 className="card-title">{this.title()}</h5>
                    {this.statusImage()}
                    <p className="card-text"></p>
                    <p className="card-text" align='left'>{this.body()}</p>
                    
                    {this.buttons()}
                    
                </div>
                {this.ApprovedBox()}
            </div>
            </div>
        );
    }
}
 
export default withRouter(ConfirmedPage);