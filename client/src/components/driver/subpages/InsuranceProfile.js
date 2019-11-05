import React from 'react';

import InsuranceItem from './InsuranceItem';
import AddInsuranceForm from './AddInsuranceForm';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';


//this can be slot into the driver screen inplace of getjob and addjobitem
// do that with routes much like in App.js
class InsuranceProfile extends React.Component {

    state = {
        insurance: "",
        hasInsurance: false,
    }

    componentDidMount() {
        const uname = this.props.login.user;
        // TODO call the fetch car query
        const { insurance } = this.props.driver;
        const flag = (insurance !== ""); 
        this.setState({ hasInsurance: flag, insurance });
    }

    render() {
        const renderItem = this.state.hasInsurance
            ? <InsuranceItem insurance={this.state.insurance}/>
            : <Card>
                <Card.Content>
                    <Card.Header>No Insurance Found in Records</Card.Header>
                </Card.Content>
              </Card>
        return (
            <div>
                <h1>Deal with your Insurance</h1>
                <div>
                    {renderItem}
                </div>
                <div>
                    <AddInsuranceForm/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login,
});

export default connect(mapStateToProps, {})(InsuranceProfile);
