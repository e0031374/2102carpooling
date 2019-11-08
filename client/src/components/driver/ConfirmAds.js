import React from 'react';
import { Card, Form, Button, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAvailableJobs, confirmBid } from '../../actions/driverActions';
import PropTypes from 'prop-types';

class ConfirmAds extends React.Component {
    state = { 
        modalOpen: false,
        bidder: "",
        advertid: -1,
        drivername: "",
        uname: "",
        bid_amount: 0,
        balance: 0,
    }

    componentDidMount() {
        const { bidder } = this.props.job; 
        const drivername = this.props.job.advertiser;
        const uname = this.props.job.advertiser;
        const { advertid } = this.props.job;
        const { balance } = this.props.ewallet;
        this.setState({
            bidder,
            advertid,
            drivername,
            balance,
            uname,
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
        this.props.confirmBid(this.state);
        this.handleClose();
    }

    render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>Select Winner</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
            >
                <Header icon='browser' content='Select Winner'/>
                <Modal.Content>
                    <h3>Do you wish to Confirm This Bid as the Winner</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.onSubmit} inverted>
                        YES 
                    </Button>
                    <Button color='red' onClick={this.handleClose} inverted>
                        No 
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}


ConfirmAds.propTypes = {
    login: PropTypes.object.isRequired,
    driver: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    driver: state.driver,
    ewallet: state.ewallet,
    login: state.login
});

export default connect(
    mapStateToProps,
    {
     confirmBid,
    }
)(ConfirmAds);
