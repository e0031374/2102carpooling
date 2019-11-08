import React from 'react';
import PropTypes from 'prop-types';
import { getDriverJobs, delDriverJob } from '../../actions/driverActions';
import { connect } from 'react-redux';

import JobCard from '../driver/JobCard'

class JobPanel extends React.Component {

    componentDidMount() {
	this.props.getDriverJobs(this.props.login.user);
    }

    render() {
        console.log(this.props.driver.jobs);
        const { jobs } = this.props.driver;
        return jobs.map(job => ( 
            <JobCard 
            key={job.advertid}
            job={job} 
            />
        )); //<JobCard />;
    }
}


JobPanel.propTypes = {
    delDriverJob: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getDriverJobs, delDriverJob}
)(JobPanel);
