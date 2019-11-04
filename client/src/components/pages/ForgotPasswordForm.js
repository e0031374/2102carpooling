import React from 'react';
import { retrievePass, getSettings } from '../../actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from  'react-router-dom';
import FixedCard from '../layout/FixedCard';
import { Link } from 'react-router-dom';

class ForgotPasswordForm extends React.Component {

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
        this.props.retrievePass({...this.state});

        //if (this.props.login.isLoggedIn) {
        //    console.log("login success");
        //    //route to homepage
        //} else {
        //    console.log("login failure");
        //    this.setState({...this.state, 
        //        msg: this.props.login.authError});
        //}
        this.props.getSettings(user);
    }
    render () {
        const passRetrieved = <FixedCard
                title={'Password retireved Successfully'}
                msg={`Password: ${this.props.login.retPass}`}
            />
        const formLogin = <form onSubmit={this.onSubmit}>
                <label>Key in any old password</label>
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
                     <label htmlFor="passField">Any Old Password: </label>
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
        const visual = this.props.login.claimed
            ? passRetrieved
            : <FixedCard title={'Retrieve Passeword'} msg={formLogin}/>
        return (
            <div style={cardStyle}>
                {visual}
            </div>
        );
    }
}

const cardStyle = {
    width: '400px',
}

ForgotPasswordForm.propTypes = {
    retrievePass : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    login: state.login,
});

export default connect(
    mapStateToProps, 
    {retrievePass,
     getSettings   
})(ForgotPasswordForm);
