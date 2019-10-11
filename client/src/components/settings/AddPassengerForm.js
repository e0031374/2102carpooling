import React from 'react';
import { connect } from 'react-redux';
import { addPassenger, getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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

    onChange = (e) => {
        this.setState({
            [e.target.name] : ! this.state[e.target.name]
        });
        console.log(this.state);
    }

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
            ? <Redirect to="/passenger" />
            : <p> Sign Up to be a Passenger </p>
        return (
            <form onSubmit={this.onSubmit}>
                {red}
                <div>
                    <label>Yes to Being a PAssenger?</label>
                    <input
                        type="checkbox"
                        name="addPassenger"
                        defaultChecked={this.state.addPassenger}
                        onChange={this.onChange}
                    />
                    <button>Confirm Register to be Passenger</button>
                </div>
            </form>
        );
    }
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
