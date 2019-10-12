
import React from 'react'
import Header from '../layout/Header';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const Advertizer = (props) => {
    if (props.login.isAd) {
        return (
            <div>
                <Header />
                <h1>Advertizer Screen</h1>
            </div>
        );
    } else {
        return (
            <Redirect to='/settings'/>
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
