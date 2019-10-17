import React from 'react';

import DriverSidebar from '../driver/DriverSidebar'
import Header from '../layout/Header';

//this can be slot into the driver screen inplace of getjob and addjobitem
// do that with routes much like in App.js
const CarProfile = (props) => {
    return (
        <div>
        <Header/>
        <DriverSidebar/>
        <h1>Deal with your Car</h1>
        //<MyCars>
        //<AddCarPanel>
        </div>
    );
}

export default CarProfile; 
