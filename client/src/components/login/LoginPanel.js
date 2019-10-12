import React from 'react';
import { loginValidate, getSettings } from '../../actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from  'react-router-dom';

class LoginPanel extends React.Component {

    state = {
        uname: "",
        pass: "",
        msg: "", 
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : [e.target.value]
        });
    }

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
        if (this.props.login.user) return <Redirect to='/home' />
        return (
            <form onSubmit={this.onSubmit}>
                <label>Login into Carpooling </label>
                <div>
                     <label htmlFor="unameField">UserName: </label>
                     <input
                         id="unameField"
                         type="text"
                         name="uname"
                         placeholder="username"
                         value={this.state.uname}
                         onChange={this.onChange}
                     />
                </div> 
                <div>
                     <label htmlFor="passField">Password: </label>
                     <input
                         id="passField"
                         type="text"
                         name="pass"
                         placeholder="password"
                         value={this.state.pass}
                         onChange={this.onChange}
                     />
                </div> 
                <button
                >Submit</button>
            </form>
        );
    }
}
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
