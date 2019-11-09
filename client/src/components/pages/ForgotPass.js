import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import styles from '../../static/css/Home.module.css';
import {Card, Input, Menu, Segment, Grid} from 'semantic-ui-react';
import { connect } from 'react-redux';

class ForgotPass extends React.Component {

    componentDidMount() {
    }

    render() {
        const { retPass } = this.props.login;
        const displayPass = retPass != "" 
            ? <h4>{`Your Password is ${retPass}`}</h4>
            : <div></div> 
        return (
            <div>
                <div className={styles.landingStyle}>
                    <h2>CARPOOLING: a 2102 project</h2>
                </div>
                <div style={container}>
                    <h2>Enter a previous password to retrieve your current password</h2>
                    <h4>Your security is our highest priority</h4>
                    <a href="/">I give up, take me back to the login page</a>

                    <ForgotPasswordForm/>
                </div>
            </div>
        );
    }
}

                    //<Link to="/">I give up, take me back to the login page</Link>
const container = {
    //textAlign: 'center',
}

const mapStateToProps = state => ({
    login: state.login,
});

export default connect(
    mapStateToProps
)(ForgotPass);
