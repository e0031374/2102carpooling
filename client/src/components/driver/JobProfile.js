import React from 'react';
import JobPanel from '../driver/JobPanel'
import AddJobItem from '../driver/AddJobItem'

const JobProfile = (props) => {
    return (
        <div>
            <h1>Driver Screen</h1>
            <JobPanel />
            <AddJobItem />
        </div>
    );
}

export default JobProfile;
