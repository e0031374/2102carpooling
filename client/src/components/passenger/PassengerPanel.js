import React from 'react'
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { getAvailableJobs } from '../../actions/passengerActions';
import RideAdsCard from './RideAdsCard';
import PropTypes from 'prop-types';

class PassengerPanel extends React.Component {
    componentDidMount() {
        //this.props.getAvailableJobs(this.props.login.user);
        this.props.getAvailableJobs();
        console.log(this.props.passenger);
    }

    markBid = (e) => {
    }

    render() {
        const {loading, jobs} = this.props.passenger;
        if (! loading) {
            return jobs.map( (job) => (
                <RideAdsCard
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

PassengerPanel.propTypes = {
    login: PropTypes.object.isRequired,
    passenger: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    passenger: state.passenger,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getSettings,
    getAvailableJobs}
)(PassengerPanel);
