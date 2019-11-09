import React from 'react';

import DriverSidebar from '../DriverSidebar'
import Header from '../../layout/Header';
import {getCar} from '../../../actions/driverActions';
import CarItem from './CarItem';
import AddCarForm from './AddCarForm';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';


//this can be slot into the driver screen inplace of getjob and addjobitem
// do that with routes much like in App.js
class CarProfile extends React.Component {

    state = {
        car: "",
        hasCar: false,
    }

    componentDidMount() {
        const uname = this.props.login.user;
        // TODO call the fetch car query
        this.props.getCar(uname);
        const { car } = this.props.driver;
        this.setState({ hasCar: true, car });
    }

    render() {
        console.log(this.props.driver);
        const renderItem = this.props.driver.car.length > 0
            ? <CarItem car={this.props.driver.car[0]}/>
            : <Card>
                <Card.Content>
                    <Card.Header>No Car Found in Records</Card.Header>
                </Card.Content>
              </Card>
        return (
            <div>
                <h1>Deal with your Car</h1>
                <div>
                    {renderItem}
                </div>
                <div>
                    <AddCarForm/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    driver: state.driver,
    login: state.login,
});

export default connect(mapStateToProps, {
    getCar,
})(CarProfile);
