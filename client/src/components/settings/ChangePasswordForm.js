import React from 'react';
import { connect } from 'react-redux';
import { getSettings, changePass } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Form, Container } from 'semantic-ui-react';

class ChangePasswordForm extends React.Component {

    state = {
        uname: "",
        pass: "",
        newpass: "",
        confirmpass: "",
        err: false,
        redir: false,
    }

    onChange = (e, {name, value}) => this.setState({ [name]: value });

    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    componentDidMount() {
        const uname = this.props.login.user;
        this.setState({ uname });
        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.newpass !== this.state.confirmpass) {
            this.setState({ err: true });
        } else {
            //call set password
            this.props.changePass(this.state);
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
        const form = <div>
                {this.renderRedirect()}
                {errDisp}
                <Form >
                        <Form.Input
                            label="Old Password"
                            name="pass"
                            type="text"
                            value={this.state.pass}
                            placeholder={this.password}
                            onChange={this.onChange}
                        />
                        <Form.Input
                            label="New Password"
                            name="newpass"
                            type="text"
                            value={this.state.newpass}
                            placeholder="password1"
                            onChange={this.onChange}
                        />
                        <Form.Input
                            label="Confirm Password"
                            type="text"
                            name="confirmpass"
                            value={this.state.confirmpass}
                            placeholder="password1"
                            onChange={this.onChange}
                        />
                    <Form.Button onClick={this.onSubmit}>submit</Form.Button>
                </Form>
            </div>
        return (
            <div style={container}>
                <Container>{form}</Container>
            </div>
        );
    }
}

const container = {
    padding: '20px',
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(
    mapStateToProps,
    {getSettings, changePass}
)(ChangePasswordForm);
