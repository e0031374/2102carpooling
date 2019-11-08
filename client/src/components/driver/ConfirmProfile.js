import React from 'react'
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { getConfirmBid } from '../../actions/driverActions';
import ConfirmAdsCard from './ConfirmAdsCard';
import PropTypes from 'prop-types';

class ConfirmProfile extends React.Component {

    state = { confirmjobs: [] }
    componentDidMount() {
        this.props.getConfirmBid(this.props.login.user);
        console.log(this.props.driver);
        const { confirmjobs } = this.props.driver;
        this.setState( { confirmjobs } );
    }

    markBid = (e) => {
    }

    render() {
        const {loading, confirmjobs} = this.props.driver;
        console.log(confirmjobs);
        if (true) {
            return this.state.confirmjobs.map( (job) => (
                <ConfirmAdsCard
                    key={job.advertid}
                    job={job}
                />
            ));
        } else {
            // use RideAds modal instead, only one bid submit
            return <h1> ERROR LOADING JOBS </h1>
        }
    }
}

ConfirmProfile.propTypes = {
    login: PropTypes.object.isRequired,
    driver: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getSettings,
    getConfirmBid}
)(ConfirmProfile);
