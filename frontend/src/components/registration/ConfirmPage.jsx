import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';

import checkmark from '../images/checkmark.png';
import crossmark from '../images/crossmark.png';
import infomark from '../images/info.png';
import UserService from '../../services/UserService';

function ConfirmPage() {

    const [errorCaught, setErrorCaught] = useState(false);
    const [isHighPriority, setIsHighPriority] = useState(true);
    const [serverResponse, setServerResponse] = useState("");

    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);

    const { token } = useParams();

    //const [executed, setExecuted] = useState(false); 

    const title = () => {

        let successTitle = "Confirmation successful!";

        switch (serverResponse) {
            case "token expired":
                return "Confirmation Token Expired";
            case "email already confirmed":
                return successTitle;
            case "token not found":
                return "Token Not Found";
            case "confirmed":
                return successTitle;
            default:
                return serverResponse;
        }
    }

    const statusImage = () => {
        return (
            errorCaught ? (
                isHighPriority ? (
                    <img src={crossmark} alt='Cross Mark' width='150' height='150' />
                ) : (
                    <img src={infomark} alt='Info Sign' width='150' height='150' />
                )
            ) : (
                <img src={checkmark} alt='Check Mark' width='150' height='150' />
            )
        );
    }

    const message = () => {


        switch (serverResponse) {
            case "token expired":
                return "Oops! Your confirmation token has expired. Please have your email resent, and confirm again. You'll be given another 15 minutes.";
            case "email already confirmed":
                return "Your account has already been confirmed. You can still go back to your login page and sign in with your account.";
            case "token not found":
                return "Oh no! Looks like this token is not found in the server. Please contact your administrator to get you reregistered.";
            case "confirmed":
                return "Your registration is complete! To access your account, please login using your email and password.";
            default:
                return "An unknown error occured: "+serverResponse;
        }
    }

    const cardColor = () => {

        let PINK = "#ffdbdb";
        let BLUE = "#ccf0ff";
        let GREEN = "#ebffcc";

        return errorCaught ? ( isHighPriority ? PINK : BLUE ) : GREEN;
    }

    const resendMail = () => {
        setLoading(true);
        UserService.resendMail(token)
            .then(() => {
                setResent(true);
                setLoading(false);
            });
    }


    const resendButton = () => {
        
        if (serverResponse === "token expired") {
            return loading ? (
                <Button variant='warning' className="my-2" disabled={true}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </Button>
            ) : (
                <Button variant='warning' onClick={resendMail} className="my-2" disabled={resent}>
                    <i className="bi bi-envelope" />{' '}Resend mail
                </Button>
            );
        }
    }

    useEffect(() => {

        UserService.confirmToken(token).then((res) => {
            setErrorCaught(false);
            setServerResponse(res.data);
        }).catch((e) => {
            setErrorCaught(true);
            setServerResponse(e.response.data.message);

            if (e.response.data.message === "email already confirmed") {
                setIsHighPriority(false);
            }
        });

        console.log("Executed");
        

    }, [token]);
        
    console.log(token);

    return (
        <div align='center'>
            <Card style={{ width: '40rem', backgroundColor: cardColor() }} className='p-3 m-5' align='left'>
                <Card.Body>
                    <Card.Title align='center'><h2>{title()}</h2></Card.Title>
                    <div className='text-center p-4'>
                        {statusImage()}
                    </div>
                    <Card.Text>
                        {message()}
                    </Card.Text>
                    {
                        !resent ? (
                            resendButton()
                        ) : (
                            <Card.Text className="text-danger">A new confirmation mail has been sent to you. Please check your inbox.</Card.Text> 
                        )
                    }
                    <Card.Text align='right'>
                        <Link to='/login'>Back to Login</Link>
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        </div>
        
    );
}

export default ConfirmPage;