import React from 'react';
import { connect } from 'react-redux';
import { addDriver, getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class AddDriverForm extends React.Component {

    state = {
        addDriver: false,
        license: "",
        redirect: false,
    }

    onComponentDidMount() {
        //this doesnt work since
        //  component only mounts once and setState will update it
        //this.setState({
        //    uname: this.props.login.user
        //});
    }

    onCheck = (e) => {
        this.setState({
            [e.target.name] : ! this.state[e.target.name]
        });
        console.log(this.state);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state);
    }

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
            ? <Redirect to="/driver" />
            : <p> Sign Up to be a Driver</p>
        return (
            <form onSubmit={this.onSubmit}>
                {red}
                <div>
                    <label>Yes to Being a Driver?</label>
                    <input
                        type="checkbox"
                        name="addDriver"
                        defaultChecked={this.state.addDriver}
                        onChange={this.onCheck}
                    />
                    <input
                        type="text"
                        name="license"
                        placeholder="A01234567"
                        value={this.state.license}
                        onChange={this.onChange}
                    />
                    <button>Confirm Register to be Driver</button>
                </div>
            </form>
        );
    }
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
