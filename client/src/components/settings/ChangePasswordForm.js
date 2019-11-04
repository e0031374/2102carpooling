import React from 'react';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class ChangePasswordForm extends React.Component {

    state = {
        oldpass: "",
        newpass: "",
        confirmpass: "",
        err: false,
        redir: false,
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.newpass !== this.state.confirmpass) {
            this.setState({ err: true });
        } else {
            //call set password
            this.setState({ ...this.state, redir: true });
        }
        console.log(this.state);
    }

    renderRedirect = () => {
        if (this.state.redir) {
            return <Redirect to='/'/>
        }
    }

    render() {
        console.log("render");
        console.log(this.state);
        const redir = this.state.redir
            ? <Redirect to='/'/> : <div></div>;
        const errDisp = this.state.err
            ? <h3>New PAssword and Old Password doesnt match</h3>
            : <div></div>;
        return (
            <div>
                {this.renderRedirect()}
                {errDisp}
                <form onSubmit={this.onSubmit}>
                    <label>Old Password
                        <input
                            name="oldpass"
                            type="text"
                            value={this.state.oldpass}
                            placeholder={this.password}
                            onChange={this.onChange}
                        />
                    </label>
                    <label>New Password
                        <input
                            name="newpass"
                            type="text"
                            value={this.state.newpass}
                            placeholder="password1"
                            onChange={this.onChange}
                        />
                    </label>
                    <label>Confirm Password
                        <input
                            type="text"
                            name="confirmpass"
                            value={this.state.confirmpass}
                            placeholder="password1"
                            onChange={this.onChange}
                        />
                    </label>
                    <button>submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(
    mapStateToProps,
    {getSettings}
)(ChangePasswordForm);
