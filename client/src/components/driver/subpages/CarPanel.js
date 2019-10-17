import React from 'react';
import PropTypes from 'prop-types';
import { getDriverJobs } from '../../actions/driverActions';
import { connect } from 'react-redux';

import JobItem from '../driver/JobItem'

class JobPanel extends React.Component {

    componentDidMount() {
	this.props.getDriverJobs(this.props.login.user);
    }

    render() {
        console.log(this.props.driver.jobs);
        const { jobs } = this.props.driver;
        return jobs.map(job => ( 
            <JobItem 
            key={job.startDateTime}
            job={job} 
            delJob={this.props.delJob}
            />
        )); //<JobItem />;
    }
}


JobPanel.propTypes = {
    delJob: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getDriverJobs}
)(JobPanel);
