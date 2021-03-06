import React from 'react';
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import AddPassengerForm from '../settings/AddPassengerForm';
import AddDriverForm from '../settings/AddDriverForm';
import AddAdvertizerForm from '../settings/AddAdvertizerForm';
import ChangePasswordForm from '../settings/ChangePasswordForm';
import PropTypes from 'prop-types';




class Settings extends React.Component {

    //state = {
    //    isdriver: null,
    //    isad: null,
    //}

    componentDidMount() {
        //const {isPassenger, isDriver, isAd} = this.props.login;
        this.props.getSettings(this.props.login.user);
        //this.setState({ isDriver, isAd })
        //console.log(this.state);
    }

    render() {
        const {isPassenger, isDriver, isAd} = this.props.login;
        console.log(this.props.login);
        //const addPassengerForm = isPassenger
        //    ? <div>You are a passenger alr</div>  
        //    : <AddPassengerForm/>;    
        const addDriverForm = isDriver 
            ? <div>You are a driver alr</div>  
            : <AddDriverForm/>;    
        const addAdvertizerForm = isAd 
            ? <div>You are an Advertiser alr</div>  
            : <AddAdvertizerForm/>;    
        console.log(isAd);
        return (
            <div>
                {addDriverForm}
                {addAdvertizerForm}
                <ChangePasswordForm/>
            </div>
        );
    }
}

Settings.propTypes = {
    getSettings: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default  connect(
    mapStateToProps, 
    {getSettings}
)(Settings);
