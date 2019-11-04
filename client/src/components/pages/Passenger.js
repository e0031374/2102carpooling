import React from 'react'
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PassengerPanel from '../passenger/PassengerPanel';
import PassengerJobItem from '../passenger/PassengerJobItem';
import Settings from './Settings';


const Passenger = (props) => {
    if (props.login.isPassenger) {
        return (
            <div>
                <h1>Passenger Screen</h1>
                <PassengerPanel/>
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
