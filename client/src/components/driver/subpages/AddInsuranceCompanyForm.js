import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
//import { addCar } from '../../actions/driverActions';
import { Form, Button } from 'semantic-ui-react';

//TODO add reducer
class AddInsuranceCompanyForm extends React.Component {
    state = {
        cname: "",
        contactnum: "",
    };

    //name and value is from te <Form.Input/>
    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        // Add car via addCar action
        //this.props.addCar(newCar);
    }

    render() {
        return (
            <Form>
                <Form.Input
                    label="Insurance Company"
                    name="cname"
                    placeholder="Aviva"
                    onChange={this.onChange}
                />
                <Form.Input
                    label="Contact Number"
                    name="contactnum"
                    placeholder="91234567"
                    onChange={this.onChange}
                />
                <Form.Button
                   onClick={this.onSubmit}
                >Submit</Form.Button>
            </Form>
        );
    }
}

AddInsuranceCompanyForm.propTypes = {
    //addCar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver
});

export default connect(mapStateToProps, {})(AddInsuranceCompanyForm);
