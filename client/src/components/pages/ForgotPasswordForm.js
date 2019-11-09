import React from 'react';
import { resetPass, getSettings } from '../../actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from  'react-router-dom';
import {Card, Form, Input, Menu, Segment, Grid} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ForgotPasswordForm extends React.Component {

    state = {
        username: "",
        oldpass: "",
        msg: "", 
        retPass: "",
    }

    componentDidMount() {
        //this.setState({ resetPass: "" });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : [e.target.value]
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const user = this.state.username;
        this.props.resetPass({...this.state});

        //if (this.props.login.isLoggedIn) {
        //    console.log("login success");
        //    //route to homepage
        //} else {
        //    console.log("login failure");
        //    this.setState({...this.state, 
        //        msg: this.props.login.authError});
        //}
        this.props.getSettings(user);
        console.log("sleeep");
        await this.sleep(500);
        console.log("sleeep");
        this.setState({ ...this.state });
        const { retPass } = this.props.login;
        this.setState({ retPass });
        console.log(this.state);
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render () {
        const passRetrieved = <Card>
                <Card.Content>
                    <Card.Header>
                        {'Password retireved Successfully'}
                    </Card.Header>
                    <Card.Description>
                        {`Password: ${this.state.retPass}`}
                    </Card.Description>
                </Card.Content>
            </Card>
        const formLogin = <Form onSubmit={this.onSubmit}>
                <label>Key in any old password</label>
                <div>
                     <Form.Input
                         label="Username"
                         id="usernameField"
                         type="text"
                         name="username"
                         placeholder="username"
                         value={this.state.username}
                         onChange={this.onChange}
                     />
                </div> 
                <div>
                     <Form.Input
                         label="Any Old Password"
                         type="text"
                         name="oldpass"
                         placeholder="password"
                         value={this.state.oldpass}
                         onChange={this.onChange}
                     />
                </div> 
                <Form.Button
                >Submit</Form.Button>
            </Form>
        const visual = this.props.login.claimed
            ? passRetrieved
            : <Card>
                  <Card.Content>
                    <Card.Header>
                        {'Retrieve Password'}
                    </Card.Header>
                    <Card.Meta>
                    </Card.Meta>
                    <Card.Description>
                        {formLogin}
                    </Card.Description>
                  </Card.Content>
            </Card>
        return (
            <div >
                {visual}
            </div>
        );
    }
}


ForgotPasswordForm.propTypes = {
    resetPass : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    login: state.login,
});

export default connect(
    mapStateToProps, 
    {resetPass,
     getSettings   
})(ForgotPasswordForm);
