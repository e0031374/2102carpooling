import React from 'react';
import LoginPanel from '../login/LoginPanel';
import SignupPanel from '../login/SignupPanel';

class Login extends React.Component {
    state = {
    }

    render () {
        return (
            <div>
                <h1>CORPOOLING </h1>
                <h3>putting all the fun of CORS into Carpooling</h3>
                <LoginPanel />
                <SignupPanel/>
            </div>
        );
    }
}


export default Login;
