import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addCar } from '../../../actions/driverActions';
import { Form, Button, Confirm } from 'semantic-ui-react';

//TODO add car and also if driver already has a car override
class AddCarForm extends React.Component {
    state = {
        uname: "",
        platenum: "",
        brand: "",
        model: "",
        colour: "",
        seatnum: 0,
    };

    //name and value is from te <Form.Input/>
    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    componentDidMount() {
        const uname = this.props.login.user;
        this.setState({ uname });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        // Add car via addCar action
        this.props.addCar(this.state);
    }

    render() {
        return (
            <Form>
                <Form.Input
                    label="Car Plate Number:"
                    type="text"
                    name="platenum"
                    placeholder="SVM1234E"
                    value={this.state.platenum}
                    onChange={this.onChange}
                />
                <Form.Input
                    label="Brand"
                    type="text"
                    name="brand"
                    placeholder="toyota"
                    value={this.state.brand}
                    onChange={this.onChange}
                />
                <Form.Input
                    label="Model"
                    name="model"
                    placeholder="civic"
                    onChange={this.onChange}
                />
                <Form.Input
                    label="Color"
                    name="colour"
                    placeholder="burgundy"
                    onChange={this.onChange}
                />
                <Form.Input
                    label="How Many Seats for Passengers"
                    type="number"
                    name="seatnum"
                    placeholder="4"
                    value={this.state.seatnum}
                    onChange={this.onChange}
                />
                <Form.Button
                   onClick={this.onSubmit}
                >Submit</Form.Button>
            </Form>
        );
    }
}

AddCarForm.propTypes = {
    //addCar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login
});

export default connect(mapStateToProps, {addCar})(AddCarForm);
