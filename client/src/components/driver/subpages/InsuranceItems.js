import React from 'react';
import InsuranceItem from './InsuranceItem';

const InsuranceItems = (props) => {
    console.log(props.insurances);
    const items = props.insurances.map(x => <InsuranceItem insurance={x}/>);
    return (
        <div>
            {items}
        </div>
    );
}

export default InsuranceItems;
