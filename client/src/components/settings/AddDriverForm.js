import React from 'react';
import { connect } from 'react-redux';
import { addDriver, getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Form, Container } from 'semantic-ui-react';

class AddDriverForm extends React.Component {

    state = {
        addDriver: false,
        license: "",
        redirect: false,
    }

    onComponentDidMount() {
    }

    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addDriver && (this.state.license.length > 1)) {
            const submitState = {
                ...this.state,
                uname: this.props.login.user
            }    
            console.log(this.submitState);
            this.props.addDriver(submitState);
            this.setState({redirect: true});
            //this.props.getSettings();
        }
    }

    render() {
        console.log(this.props.login);
        console.log("launch");
        console.log(this.state);
        const red = (this.state.redirect)
            ? <Redirect to="/landing" />
            : <p> Sign Up to be a Driver</p>
        const form = <Form>
                <div>
                    <Form.Checkbox
                        label="Yes to Being an Driver?"
                        name="addDriver"
                        defaultChecked={this.state.addDriver}
                        onChange={this.onCheck}
                    />
                    <Form.Input
                        type="text"
                        name="license"
                        label="license"
                        placeholder="A01234567"
                        value={this.state.license}
                        onChange={this.onChange}
                    />
                    <Form.Button
                        onClick={this.onSubmit}
                    >Register to be Driver</Form.Button>
                </div>
            </Form>;
        const alrDriver = this.props.login.isDriver
            ? <p> You already are an Driver </p>
            : form;
        return (
            <div style={container}>
                <Container>{alrDriver}</Container>
            </div>
        );
    }
}

const container = {
    padding: '20px',
}

AddDriverForm.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    login: state.login
});
export default  connect(
    mapStateToProps, 
    {addDriver,
     getSettings}
)(AddDriverForm);
