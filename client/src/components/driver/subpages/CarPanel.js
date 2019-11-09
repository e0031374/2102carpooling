// DEPRECATED REFER TO CARPROFILE
import React from 'react';
import PropTypes from 'prop-types';
import { getDriverJobs } from '../../actions/driverActions';
import { connect } from 'react-redux';

import CarItem from './CarItem'

class CarPanel extends React.Component {

    componentDidMount() {
	this.props.getDriverJobs(this.props.login.user);
    }

    render() {
        console.log(this.props.driver.jobs);
        const { car } = this.props.driver;
        return car.map(job => ( 
            <CarItem 
            key={job.startDateTime}
            car={job} 
            delJob={this.props.delJob}
            />
        )); //<CarItem />;
    }
}


CarPanel.propTypes = {
    delJob: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getDriverJobs}
)(CarPanel);
