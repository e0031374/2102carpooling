import React from 'react';

import DriverSidebar from '../DriverSidebar'
import Header from '../../layout/Header';
import InsuranceProfile from './InsuranceProfile';
import InsuranceCompanyProfile from './InsuranceCompanyProfile';

//this can be slot into the driver screen inplace of getjob and addjobitem
// do that with routes much like in App.js
const Insurance = (props) => {
    return (
        <div>
        <h1>Insure yourself here</h1>
            <InsuranceProfile/>
            <InsuranceCompanyProfile/>
        </div>
    );
}
        //<Header/>
        //<DriverSidebar/>
        //<MyCars>
        //<AddCarPanel>

export default Insurance; 
