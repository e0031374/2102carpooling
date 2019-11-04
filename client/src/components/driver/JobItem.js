import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delDriverJob  } from '../../actions/driverActions';
import Card from '../layout/Card';

const JobItem = (props) => {
    console.log(props.job.uname);
    const { uname, startDateTime , origin, endDateTime} = props.job;
    const onClick = (e) => {
        const out = `Delete Job: ${uname}, ${startDateTime}`;
        console.log(out);
        props.delDriverJob(uname,startDateTime);
    }

    const content = <div>
            <p> {'Origin: '} {origin} </p>
            <p> {'Start: '} {startDateTime} 
                {'    End: '} {endDateTime} </p>
            <p> {'HighestBid: '} {' '} 
                <button onClick={onClick}
                >x</button>
            </p>
        </div>

    return (
        <Card
            title={origin + " : " + startDateTime}
            msg={content}
        />
    );
}

export default JobItem;
