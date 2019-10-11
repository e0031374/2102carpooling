import React from 'react';
import PropTypes from 'prop-types';

import JobItem from '../driver/JobItem'

class JobPanel extends React.Component {

    render() {
        console.log(this.props.jobs);
        return this.props.jobs.map(job => ( 
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

export default JobPanel;
