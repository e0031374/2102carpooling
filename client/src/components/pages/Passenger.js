import React from 'react'
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PassengerPanel from '../passenger/PassengerPanel';
import PassengerSidebar from '../passenger/PassengerSidebar';
import PassengerJobItem from '../passenger/PassengerJobItem';
import Settings from './Settings';


const Passenger = (props) => {
    //if (props.login.isPassenger) {
    if (true) {
        return (
            <div>
                <h1>Passenger Screen</h1>
                <PassengerSidebar/>
            </div>
        );
    } else {
        return (
            <div>
                <Settings/>
            </div>
        );
            //<Redirect to='/settings'/>
    }
}


Passenger.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(
    mapStateToProps, 
    {getSettings}
)(Passenger);
