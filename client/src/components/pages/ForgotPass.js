import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPass = (props) => {

    return (
        <div>
            <h1>Enter a previous password to retrieve your current password</h1>
            <h3>Your security is our highest priority</h3>
            <Link to="/">I give up, take me back to the login page</Link>
            <ForgotPasswordForm/>
        </div>
    );
}


export default ForgotPass
