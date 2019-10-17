import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delDriverJob  } from '../../actions/driverActions';

const JobItem = (props) => {
    console.log(props.job.user);
    const { user, startDateTime , origin, endDateTime} = props.job;
    const onClick = (e) => {
        props.delDriverJob(user,startDateTime);
    }

    return (
    <div>
        <p> {user} {' | Origin: '} 
        {origin} {' | Start: '} 
        {startDateTime} {' | End: '} 
        {endDateTime} {' | Highest Bid: '} 
        current highest bid? 
        {' '}
        <button onClick={onClick}
        >x</button>
        </p>
    </div>
    );
}

export default JobItem;
