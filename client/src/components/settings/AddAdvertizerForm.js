import React from 'react';
import { connect } from 'react-redux';
import { addAdvertizer, getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class AddAdvertizerForm extends React.Component {

    state = {
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
            ? <Redirect to="/advertizer" />
            : <p> Sign Up to be a Advertizer</p>
        return (
            <form onSubmit={this.onSubmit}>
                {red}
                <div>
                    <label>Yes to Being an Advertizer?</label>
                    <input
                        type="checkbox"
                        name="addAd"
                        defaultChecked={this.state.addAd}
                        onChange={this.onChange}
                    />
                    <button>Confirm Register to be an Advertizer</button>
                </div>
            </form>
        );
    }
}

AddAdvertizerForm.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    login: state.login
});
export default  connect(
    mapStateToProps, 
    {addAdvertizer,
     getSettings}
)(AddAdvertizerForm);
