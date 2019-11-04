import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../layout/Card';

class CarItem extends React.Component {
    render() {
        return (
            <Card title={'Car'} msg={'Honda Civic'}/>
        );
    }
}

//class JobItem extends React.Component {
//    render() {
//        console.log(this.props.job.user);
//        const { user, startDateTime , origin, endDateTime} = this.props.job;
//
//        return (
//        <div>
//            <p> {user} {' | Origin: '} 
//            {origin} {' | Start: '} 
//            {startDateTime} {' | End: '} 
//            {endDateTime} {' | Highest Bid: '} 
//            current highest bid? 
//            {' '}
//            <button onClick={this.props.delJob.bind(this, user, startDateTime)}
//            >x</button>
//            </p>
//        </div>
//        );
//    }
//}
//
//
//JobItem.propTypes = {
//    job: PropTypes.object.isRequired,
//    delJob: PropTypes.func.isRequired,
//}

export default CarItem;
