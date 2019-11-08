import React from 'react'
import { connect } from 'react-redux';
import { getSettings } from '../../actions/loginActions';
import { getWinBids } from '../../actions/passengerActions';
import WinBidsCards from './WinBidsCards';
import PropTypes from 'prop-types';

class WinProfile extends React.Component {
    componentDidMount() {
        //this.props.getAvailableJobs(this.props.login.user);
        //this.props.getWinBids();
        console.log(this.props.passenger);
    }

    markBid = (e) => {
    }

    render() {
        const {loading, winbids} = this.props.passenger;
        console.log(winbids);
        if (true) {
            return winbids.map( (winbid) => (
                <WinBidsCards
                    key={winbid.advertid}
                    bid={winbid}
                />
            ));
        } else {
            // use RideAds modal instead, only one bid submit
            return <h1> ERROR LOADING JOBS </h1>
        }
    }
}

WinProfile.propTypes = {
    login: PropTypes.object.isRequired,
    passenger: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    passenger: state.passenger,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getSettings,
    getWinBids}
)(WinProfile);
