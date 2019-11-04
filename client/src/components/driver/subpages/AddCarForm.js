import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addCar } from '../../actions/driverActions';

class AddCarForm extends React.Component {
    state = {
        brand: "",
        platenum: "",
        seats: 0,
    };

    //name and value is from te <input/>
    onChange = (e) => this.setState({ 
        [e.target.name]: e.target.value
    });

    onSubmit = (e) => {
        e.preventDefault();
        const {brand, platenum, seats, model} = this.state;
        const newCar = {
            brand, platenum, seats, model
        }

        // Add car via addCar action
        this.props.addCar(newCar);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                <label>Brand: 
                    <input
                        type="text"
                        name="brand"
                        placeholder="toyota"
                        value={this.state.brand}
                        onChange={this.onChange}
                    />
                </label>
                </div>
                <div>
                    <label htmlFor="platenum">Car Plate Number: </label>
                    <input
                        id="platenum"
                        type="text"
                        name="platenum"
                        placeholder="SVM1234E"
                        value={this.state.platenum}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <label>Seats for Passengers</label>
                    <input
                        type="number"
                        name="seats"
                        placeholder="4"
                        value={this.state.seats}
                        onChange={this.onChange}
                    />
                </div>
                <button
                >Submit</button>
            </form>
        );
    }
}

AddCarForm.propTypes = {
    addCar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver
});

export default connect(mapStateToProps, {addCar})(AddCarForm);
