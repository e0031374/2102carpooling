import React from 'react';

import DriverSidebar from '../DriverSidebar'
import Header from '../../layout/Header';
import CarItem from './CarItem';

//this can be slot into the driver screen inplace of getjob and addjobitem
// do that with routes much like in App.js
const CarProfile = (props) => {
    return (
        <div>
        <h1>Deal with your Car</h1>
        <CarItem/>
        </div>
    );
}
        //<Header/>
        //<DriverSidebar/>
        //<MyCars>
        //<AddCarPanel>

export default CarProfile; 
