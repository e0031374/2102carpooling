import React from 'react';
import { connect } from 'react-redux';
import { addAdvertizer, getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Form, Container } from 'semantic-ui-react';

class AddAdvertizerForm extends React.Component {

    state = {
        addAd: false,
        redirect: false,
    }

    onComponentDidMount() {
        this.props.getSettings(this.props.login.user);
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
        if (this.state.addAd) {
            const submitState = {
                ...this.state,
                uname: this.props.login.user
            }    
            console.log(this.submitState);
            this.props.addAdvertizer(submitState);
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
            : <p> Sign Up to be a Advertizer</p>;
        const form = <Form onSubmit={this.onSubmit}>
                <div>
                    <Form.Checkbox
                        label="Yes to Being an Advertizer?"
                        name="addAd"
                        defaultChecked={this.state.addAd}
                        onChange={this.onCheck}
                    />
                    <Form.Button
                        onClick={this.onSubmit}
                    >Register to be an Advertizer</Form.Button>
                </div>
            </Form>;
        const alrAd = this.props.login.isAd 
            ? <div><p> You already are an Advertizer </p>
                <Redirect to="/landing" />
              </div>
            : form;
        return (
            <div style={container}>
                <Container>
                    {red}{alrAd}
                </Container>
            </div>
        );
    }
}

const container = {
    padding: '20px',
}

AddAdvertizerForm.propTypes = {
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    login: state.login
});
export default  connect(
    mapStateToProps, 
    {addAdvertizer,
     getSettings}
)(AddAdvertizerForm);
