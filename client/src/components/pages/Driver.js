import React from 'react'

import JobPanel from '../driver/JobPanel'
import AddJobItem from '../driver/AddJobItem'
import DriverSidebar from '../driver/DriverSidebar'
import PropTypes from 'prop-types';
import Header from '../layout/Header';

import { connect } from 'react-redux';
import { getJobs, deleteJob } from '../../actions/jobActions';

class Driver extends React.Component {

    conponentDidMount() {
        this.props.getJobs(); //calls the action to get the reucer
    }
    delJob = (user, startDateTime) => {
        console.log("deleteJob");
        console.log(user);
        this.props.deleteJob(startDateTime);
        //cant use this anymore since using redux
        //this.setState( { jobs: this.state.jobs.filter(job => { 
        //    return ! (job.user === user 
        //        && job.startDateTime === startDateTime); 
        //})});
    };

    addJob = (newJobState) => {
        console.log(newJobState);
    };

    render() {
        console.log(this.props);
        console.log(this.props.job.user);
        const { jobs } = this.props.job;
        return (
            <div>
                <Header/>
                <div style={innerStyle}>
                    <DriverSidebar style={innerStyle} />
                    <div style={innerStyle}>
                        <h1>Driver Screen</h1>
                        <JobPanel 
                        jobs={jobs}
                        delJob={this.delJob}
                        />
                        <AddJobItem 
                        addJob={this.addJob}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const innerStyle = {
    display: 'inline',
}

Driver.propTypes = {
    getJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    job: state.job
});

export default connect(
    mapStateToProps, 
    {getJobs, deleteJob}
)(Driver);
