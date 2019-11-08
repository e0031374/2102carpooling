import React from 'react';

import InsuranceCompanyItems from './InsuranceCompanyItems';
import AddInsuranceCompanyForm from './AddInsuranceCompanyForm';
import { getInsuranceCompanies } from '../../../actions/driverActions';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';


//this can be slot into the driver screen inplace of getjob and addjobitem
// do that with routes much like in App.js
class InsuranceCompanyProfile extends React.Component {

    state = {
        insuranceCompanies: [],
        hasInsurance: false,
    }

    componentDidMount() {
        // TODO call the fetch car query
        this.props.getInsuranceCompanies();
        const { insuranceCompanies } = this.props.driver;
        const flag = (insuranceCompanies.length > 0); 
        this.setState({ hasInsuranceCompany: flag, insuranceCompanies });
        console.log(this.state);
    }

    render() {
        console.log(this.props.driver)
        const renderItem = this.props.driver.insuranceCompanies.length > 0 //this.state.hasInsuranceCompany
            ? <InsuranceCompanyItems insuranceCompanies={this.props.driver.insuranceCompanies}/>
            : <Card>
                <Card.Content>
                    <Card.Header>No InsuranceCompany Found in Records</Card.Header>
                </Card.Content>
              </Card>
        return (
            <div>
                <h1>Register with your Insurance Company</h1>
                <div>
                    {renderItem}
                </div>
                <div>
                </div>
            </div>
        );
    }
}
                    //<AddInsuranceCompanyForm/>

const mapStateToProps = state => ({
    driver: state.driver,
});

export default connect(mapStateToProps, 
    {getInsuranceCompanies})(InsuranceCompanyProfile);
