import React from 'react';
import { loginValidate, getSettings } from '../../actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from  'react-router-dom';
import FixedCard from '../layout/FixedCard';
import { Link } from 'react-router-dom';
import { Confirm, Grid, Icon, Form, Button, 
    Loader, Header, Card } from 'semantic-ui-react';

class LoginPanel extends React.Component {

    state = {
        uname: "",
        pass: "",
        msg: "", 
    }

    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    onSubmit = (e) => {
        e.preventDefault();
        const user = this.state.uname;
        this.props.loginValidate({...this.state});

        if (this.props.login.isLoggedIn) {
            console.log("login success");
            //route to homepage
        } else {
            console.log("login failure");
            this.setState({...this.state, 
                msg: this.props.login.authError});
        }
        this.props.getSettings(user);
    }
    render () {
        //if (this.props.login.user) return <Redirect to='/home' />
        if (this.props.login.user) return <Redirect to='/landing' />
        const formLogin = <Form >
                <div>
                     <Form.Input
                         label="Username"
                         id="unameField"
                         type="text"
                         name="uname"
                         placeholder="username"
                         value={this.state.uname}
                         onChange={this.onChange}
                     />
                </div> 
                <div>
                     <Form.Input
                         label="Password"
                         id="passField"
                         type="text"
                         name="pass"
                         placeholder="password"
                         value={this.state.pass}
                         onChange={this.onChange}
                     />
                </div> 
                <Form.Button onClick={this.onSubmit}
                >Submit</Form.Button>
                <p>{'Forgot your password? '}
                    <Link to="/forgot">click here</Link>
                </p>
            </Form>
        return (
            <div>
                        {formLogin}
            </div>
        );
    }
}

const cardStyle = {
    padding: '20px',
    borderRadius: '5px', /* 5px rounded corners */
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
}

const formStyle = {
    padding: '5px',
    borderRadius: '5px', /* 5px rounded corners */
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
}
//const cardStyle = {
//    display: 'inline-block',
//    width: '400px',
//}

LoginPanel.propTypes = {
    loginValidate : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    login: state.login,
});
export default connect(
    mapStateToProps, 
    {loginValidate,
     getSettings   
})(LoginPanel);
