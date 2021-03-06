import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addInsurance, getInsurance } from '../../../actions/driverActions';
import { Form, Button } from 'semantic-ui-react';


//TODO add reducer
class AddInsuranceForm extends React.Component {
    state = {
        uname: "",
        policynum: "",
        insuranceProvider: "",
        uname: "",
        options: [],
    };

    //name and value is from te <Form.Input/>
    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    componentDidMount() {
        //const options = optList.map(x => { key: x, text: x, value: x});
        const {insuranceCompanies} = this.props.driver;
        console.log(insuranceCompanies);
        const options = insuranceCompanies.map( x => ({ 
            key: x.cname, 
            text: x.cname, 
            value: x.cname,
        }));
        this.setState({ uname: this.props.login.user, options });
        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.addInsurance(this.state);

        // Add car via addCar action
        //this.props.addCar(newCar);
    }

    render() {
        return (
            <Form>
                <Form.Select
                    fluid
                    label="Insurance Provider"
                    name="insuranceProvider"
                    options={this.state.options}
                    onChange={this.onChange}
                    placeholder="Aviva"
                />
                <Form.Input
                    label="Policy Number"
                    name="policynum"
                    placeholder="1235431234"
                    onChange={this.onChange}
                />
                <Form.Button
                   onClick={this.onSubmit}
                >Submit</Form.Button>
            </Form>
        );
    }
}

AddInsuranceForm.propTypes = {
    addInsurance: PropTypes.func.isRequired,
    getInsurance: PropTypes.func.isRequired,
    driver: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login,
});

export default connect(mapStateToProps, 
    {addInsurance, getInsurance}
)(AddInsuranceForm);
