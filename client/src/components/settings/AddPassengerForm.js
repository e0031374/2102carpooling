import React from 'react';
import { connect } from 'react-redux';
import { addPassenger, getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Form, Container } from 'semantic-ui-react';

class AddPassengerForm extends React.Component {

    state = {
        addPassenger: false,
        addDriver: false,
        addLicense: "",
        addAd: false,
        redirect: false,
    }

    onComponentDidMount() {
        //this doesnt work since
        //  component only mounts once and setState will update it
        //this.setState({
        //    uname: this.props.login.user
        //});
    }

    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addPassenger) {
            const submitState = {
                ...this.state,
                uname: this.props.login.user
            }    
            console.log(this.submitState);
            this.props.addPassenger(submitState);
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
            : <p> Sign Up to be a Passenger</p>
        const form = <Form>
                <div>
                    <Form.Checkbox
                        label="Yes to Being an Passenger?"
                        name="addPassenger"
                        defaultChecked={this.state.addPassenger}
                        onChange={this.onCheck}
                    />
                    <Form.Button
                        onClick={this.onSubmit}
                    >Register to be Passenger</Form.Button>
                </div>
            </Form>;
        const alrPassenger = this.props.login.isPassenger
            ? <p> You already are an Passenger </p>
            : form;
        return (
            <div style={container}>
                <Container>{alrPassenger}</Container>
            </div>
        );
    }
}

const container = {
    padding: '20px',
}

AddPassengerForm.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    login: state.login
});
export default  connect(
    mapStateToProps, 
    {addPassenger,
     getSettings}
)(AddPassengerForm);
