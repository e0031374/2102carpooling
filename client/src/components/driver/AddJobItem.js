import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addDriverJob } from '../../actions/driverActions';
import { Confirm, Grid, Icon, Form, Button, Loader } from 'semantic-ui-react';

class AddJobItem extends React.Component {
    state = {
        modal: false,
        advertiser: "",
        origin: "",
        destination: "",
        ridedate: "",
        start_time: "",
        est_trip_time: "",
        misc_advert: "",
        areas: [],
        options: [],

    };

    componentDidMount() {
        //const options = optList.map(x => { key: x, text: x, value: x});
        const {areas} = this.props.driver;
        const advertiser = this.props.login.user;
        console.log(areas);
        console.log(this.props.driver);
        const options = areas.map( x => ({ 
            key: x.areaname, 
            text: x.areaname, 
            value: x.areaname,
        }));
        this.setState({ uname: this.props.login.user, options, areas, advertiser });
        console.log(this.state);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //name and value is from te <Form.Input/>
    onChange = (e, {name, value}) => this.setState({ [name]: value });
    onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });

    advertizeMe = (e) => {
        this.setState({
            [e.target.name]: ! e.target.value
        });
    }

    //onChange = (e, {name, value}) => this.setState({ [name]: value });
    //onCheck = (e, {name, value}) => this.setState({ [name]: ! this.state[name] });
    onSubmit = (evenT) => {
        evenT.preventDefault();

        this.setState({ ridedate: this.state.start_time });

        // Add job via addJob action
        console.log(this.state);
        this.props.addDriverJob(this.state);
    }

    render() {
        return (
            <div style={container}>
            <Grid container>
            <Grid.Row>
            <Grid.Column>
            <Form onSubmit={this.onSubmit}>
                <div>
                    <Form.Select
                        fluid
                        label='Start Area of Route:'
                        name="origin"
                        options={this.state.options}
                        onChange={this.onChange}
                        placeholder="Changi"
                    />
                </div>
                <div>
                    <Form.Select
                        fluid
                        label='Destination Area of Route:'
                        name="destination"
                        options={this.state.options}
                        onChange={this.onChange}
                        placeholder="Woodlands"
                    />
                </div>
                <div>
                    <Form.Input
                        label="Start Date Time of Route (YYYY/MM/DD HH:mm:ss)"
                        type="text"
                        name="start_time"
                        placeholder="YYYY/MM/DD HH:mm:ss"
                        value={this.state.start_time}
                        onChange={this.onChange}
                    />
                </div>
                <Form.Input
                    label="Est Time of Trip in mins"
                    type="number"
                    name="est_trip_time"
                    placeholder="End time of route"
                    value={this.state.est_trip_time}
                    onChange={this.onChange}
                />
                <Form.Input
                    label="Notes to Passengers (Optional)"
                    type="text"
                    name="misc_advert"
                    placeholder="Strictly No Beluga Whales, cats and dogs are okay"
                    value={this.state.misc_advert}
                    onChange={this.onChange}
                />
                <Form.Button
                >Submit</Form.Button>
            </Form>
            </Grid.Column>
            </Grid.Row>
            </Grid>
            </div>
        );
    }
}

const container = {
    paddingTop: '80px',
}

AddJobItem.propTypes = {
    addDriverJob: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    job: state.jobs,
    login: state.login,
});

export default connect(mapStateToProps, {addDriverJob})(AddJobItem);


