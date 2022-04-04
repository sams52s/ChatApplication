import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserService from '../services/UserService';
import GoogleButton from './GoogleButton';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName_input: '',
            lastName_input: '',
            email_input: '',
            password_input: '',
            password2_input: '',
            email_in_msg: '',
            errorMessage: null,
            loading: false,
            showApprovedMsg: false
        }
    }

    ErrorBox() {
        const { errorMessage } = this.state;
        if (errorMessage !== null) {
            
            return (
                <div className="card text-white bg-danger mb-3">
                    <div className="card-body" align='left'>
                        ERROR: {errorMessage}
                    </div>
                </div>
            );
        }
    }

    VerificationAlert() {

        const { loading } = this.state;

        if (this.state.showApprovedMsg) {
            
            return (

                <div className='m-3'>
                    { loading ? (
                        <div align="center">
                            <div className="spinner-border" align="center" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-success" role="alert">
                            <div>
                                <h5 className="card-title">Confirm your account</h5>
                                <p className="card-text" align="left">A confirmation email has been sent to <b>{this.state.email_in_msg}</b>. Please confirm by clicking the link in the email before it expires in 15 minutes.<br/><br/>You may close this page.</p>
                            </div>
                        </div>
                    ) }
                </div>

            );
        }
    }

    cancel = () => {
        this.props.history.push("/login");
    }

    submitHandler = (event) => {

        event.preventDefault(); 

        if (this.state.password_input === this.state.password2_input) {
            let fetchedJson = {
                firstName: this.state.firstName_input,
                lastName: this.state.lastName_input,
                email: this.state.email_input,
                password: this.state.password_input
            };

            this.setState({errorMessage: null, loading: true, showApprovedMsg: true});

            UserService.createUser(fetchedJson)
                .then(() => this.setState({loading: false, email_in_msg: this.state.email_input}))
                .catch((e) => this.setState({loading: false, showApprovedMsg: false, errorMessage: e.response.data.message}));
        
        }
            
        else {
            this.setState({errorMessage: "passwords do not match"});
        }

    }

    googleSetEmail = (input) => {
        this.props.app_setEmail(input);
    }
    
    render() { 
        return (
            <div className='p-3'>
                <main>
                <div className='container'>
                    <div className='row'>
                        <div className = "card col-md-6 offset-md-3 offset-md-3 p-4">
                            <h2 className='text-center p-2'>Registration form</h2>
                            <div className='card-body'>
                                {this.ErrorBox()}
                                <form onSubmit={this.submitHandler}>
                                    <div className = "form-group p-1">
                                        <label className='my-2'>First Name: </label>
                                        <input 
                                        placeholder='First Name' 
                                        name='firstname' 
                                        className='form-control'
                                        value={this.state.firstName_input}
                                        onChange={(e) => this.setState({firstName_input: e.target.value})}
                                        required/>
                                    </div>
                                    <div className = "form-group p-1">
                                        <label className='my-2'>Last Name: </label>
                                        <input 
                                        placeholder='Last Name' 
                                        name='lastname' 
                                        className='form-control'
                                        value={this.state.lastName_input}
                                        onChange={(e) => this.setState({lastName_input: e.target.value})}
                                        required/>
                                    </div>
                                    <div className = "form-group p-1">
                                        <label className='my-2'>E-mail Address: </label>
                                        <input 
                                        placeholder='E-mail Address' 
                                        name='email' 
                                        className='form-control'
                                        value={this.state.email_input}
                                        onChange={(e) => this.setState({email_input: e.target.value})}
                                        required/>
                                    </div>
                                    <div className = "form-group p-1">
                                        <label className='my-2'>Password: </label>
                                        <input 
                                        placeholder='Password' 
                                        type='password' 
                                        name='pwd' 
                                        className='form-control'
                                        value={this.state.password_input}
                                        onChange={(e) => this.setState({password_input: e.target.value})}
                                        required/>
                                    </div>
                                    <div className = "form-group p-1">
                                        <label className='my-2'>Confirm Password: </label>
                                        <input 
                                        placeholder='Password' 
                                        type='password' 
                                        name='conf_pwd' 
                                        className='form-control'
                                        value={this.state.password2_input}
                                        onChange={(e) => this.setState({password2_input: e.target.value})}
                                        required/>
                                    </div>
                                    <br></br>

                                    <input type='submit' className="btn btn-success m-2" name='Register'/>
                                    <button type='button' className="btn btn-link m-2" onClick={this.cancel}>Back to Login</button>
                                    
                                </form>
                                {this.VerificationAlert()}
                                <hr></hr>
                                <div align='center'>
                                    <GoogleButton login_setEmail = {this.googleSetEmail} />
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
                </main>
            </div>    
        );
    }
}
 
export default withRouter(Registration);