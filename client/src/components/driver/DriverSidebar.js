import React from 'react';
import { Link } from 'react-router-dom';

const DriverSidebar = (props) => {
    return (
        <div> 
            <h3>Driver Stuff</h3>
            <ul>
                <li><Link to="/driver/jobprofile">Job Profile</Link></li>
                <li><Link to="/driver/carprofile">Car Profile</Link></li>
                <li><Link to="/driver/insurance">Buy Insurance</Link></li>
            </ul>
        </div>
    );
}


export default DriverSidebar;

