import React from 'react'
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const Passenger = (props) => {
    if (props.login.isPassenger) {
        return (
            <div>
                <Header />
                <h1>Passenger Screen</h1>
            </div>
        );
    } else {
        return (
            <Redirect to='/settings'/>
        );
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
