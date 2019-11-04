
import React from 'react'
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Settings from './Settings';


const Advertizer = (props) => {
    if (props.login.isAd) {
        return (
            <div>
                <h1>Advertizer Screen</h1>
            </div>
        );
    } else {
        return (
            <div>
                <Settings/>
            </div>
        );
    }
}


Advertizer.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(
    mapStateToProps, 
    {getSettings}
)(Advertizer);
