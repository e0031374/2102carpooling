import React from 'react';
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import AddPassengerForm from '../settings/AddPassengerForm';
import PropTypes from 'prop-types';




class Settings extends React.Component {
    componentDidMount() {
        this.props.getSettings(this.props.login.user);
    }

    render() {
        const {isPassenger, isDriver, isAd} = this.props.login;
        console.log(this.props.login);
        const addPassengerForm = isPassenger
            ? <div>You are a passenger alr</div>  
            : <AddPassengerForm/>;    
        return (
            <div>
                <Header />
                {addPassengerForm}
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
