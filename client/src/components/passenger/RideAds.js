import React from 'react';
import { Card, Form, Button, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAvailableJobs, submitBid } from '../../actions/passengerActions';
import PropTypes from 'prop-types';

class RideAds extends React.Component {
    state = { 
        modalOpen: false,
        bidder: "",
        advertid: -1,
        drivername: "",
        bid_amount: 0,
        balance: 0,
    }

    componentDidMount() {
        const bidder = this.props.login.user; 
        const drivername = this.props.job.advertiser;
        const { advertid } = this.props.job;
        const { balance } = this.props.ewallet;
        this.setState({
            bidder,
            advertid,
            drivername,
            balance,
        });
        console.log(this.state);
    }

    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });
    onChange = (e, {name, value}) => {
        this.setState({ [name]: value })
        console.log(this.state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const { bidder, drivername } = this.state;
        if ( bidder == drivername ) {
            console.log("error cannot bid on your own job");
            this.handleClose();
            return;
        }
        if (this.state.balance <= 0) {
            console.log("error bid 0 dollars or less");
            console.log(this.state);
            return;
        }
        this.props.submitBid(this.state);
        this.handleClose();
    }

    render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>Submit Bid</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
            >
                <Header icon='browser' content='Submit Bid'/>
                <Modal.Content>
                    <h3>Form to submit bid</h3>
                    <Form>
                        <Form.Input
                            type="number"
                            label='Bid Amount in Dollars'
                            name='bid_amount'
                            placeholder='1234'
                            onChange={this.onChange}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.onSubmit} inverted>
                        Submit
                    </Button>
                    <Button color='red' onClick={this.handleClose} inverted>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}


RideAds.propTypes = {
    login: PropTypes.object.isRequired,
    passenger: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    passenger: state.passenger,
    ewallet: state.ewallet,
    login: state.login
});

export default connect(
    mapStateToProps,
    {
     submitBid,
    }
)(RideAds);
