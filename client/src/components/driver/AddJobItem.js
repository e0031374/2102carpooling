import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addDriverJob } from '../../actions/driverActions';
import { Confirm, Grid, Icon, Form, Button, Loader } from 'semantic-ui-react';

class AddJobItem extends React.Component {
    state = {
        modal: false,
        origin: "",
        destination: "",
        startDateTime: "",
        endDateTime: "",
        isAd: false,
        adFee: 0,

    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //name and value is from te <input/>
    onChange = (e) => this.setState({ 
        [e.target.name]: e.target.value
    });

    advertizeMe = (e) => {
        this.setState({
            [e.target.name]: ! e.target.value
        });
    }

    onSubmit = (evenT) => {
        evenT.preventDefault();
        const {origin, destination, startDateTime, endDateTime, isAd, adFee} = this.state;
        //this.props.addJob(this.state.);
        //this.setState({ [param]: ''});
        const newJob = {
            origin, destination, startDateTime, endDateTime
        }

        // Add job via addJob action
        this.props.addDriverJob(newJob);

        if (isAd) {
            const ad = {
                post: newJob,
                fee: adFee,
            }
            //this.props.addAdvert();
        }
    }

    render() {
        return (
            <div style={container}>
            <Grid container>
            <Grid.Row>
            <Grid.Column>
            <Form onSubmit={this.onSubmit}>
                <div>
                    <Form.Input
                        label='Start Address of Route:'
                        type="text"
                        name="origin"
                        placeholder="start address of route"
                        value={this.state.origin}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <Form.Input
                        label='Destination'
                        id="dest"
                        type="text"
                        name="destination"
                        placeholder="start address of route"
                        value={this.state.destination}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <Form.Input
                        label="Start Date Time of Route"
                        type="text"
                        name="startDateTime"
                        placeholder="start time of route"
                        value={this.state.startDateTime}
                        onChange={this.onChange}
                    />
                </div>
                <Form.Input
                    label="End Date Time of Route"
                    type="text"
                    name="endDateTime"
                    placeholder="End time of route"
                    value={this.state.endDateTime}
                    onChange={this.onChange}
                />
                <Form.Checkbox
                    label="Advertize?"
                    name="isAd"
                    defaultChecked={this.state.isAd}
                    onChange={this.advertizeMe}
                />
                <label>Advert Fee
                    <Form.Input 
                        type="number" 
                        name="adFee"
                        value={this.state.adFee}
                        onChange={this.onChange}
                    />
                </label>
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
    job: state.jobs
});

export default connect(mapStateToProps, {addDriverJob})(AddJobItem);


            //<form onSubmit={this.onSubmit}>
            //    <div>
            //    <label>Start Address of Route :
            //        <input
            //            type="text"
            //            name="origin"
            //            placeholder="start address of route"
            //            value={this.state.origin}
            //            onChange={this.onChange}
            //        />
            //    </label>
            //    </div>
            //    <div>
            //        <label htmlFor="dest">Destination</label>
            //        <input
            //            id="dest"
            //            type="text"
            //            name="destination"
            //            placeholder="start address of route"
            //            value={this.state.destination}
            //            onChange={this.onChange}
            //        />
            //    </div>
            //    <div>
            //        <label></label>
            //        <input
            //            type="text"
            //            name="startDateTime"
            //            placeholder="start time of route"
            //            value={this.state.startDateTime}
            //            onChange={this.onChange}
            //        />
            //    </div>
            //    <input
            //        type="text"
            //        name="endDateTime"
            //        placeholder="start time of route"
            //        value={this.state.endDateTime}
            //        onChange={this.onChange}
            //    />
            //    <label>Advertize?
            //        <input 
            //            type="checkbox" 
            //            name="isAd"
            //            defaultChecked={this.state.isAd}
            //            onChange={this.advertizeMe}
            //        />
            //    </label>
            //    <label>Advert Fee
            //        <input 
            //            type="number" 
            //            name="adFee"
            //            value={this.state.adFee}
            //            onChange={this.onChange}
            //        />
            //    </label>
            //    <button
            //    >Submit</button>
            //</form>
