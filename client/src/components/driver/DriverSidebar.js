import React from 'react';
import { Link } from 'react-router-dom';

const DriverSidebar = (props) => {
    return (
        <div> 
            <h3>Driver Stuff</h3>
            <ul>
                <li><Link>Car Profile</Link></li>
                <li><Link>Buy Insurance</Link></li>
            </ul>
        </div>
    );
}


export default DriverSidebar;

