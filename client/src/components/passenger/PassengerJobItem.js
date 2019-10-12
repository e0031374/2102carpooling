import React from 'react'
import PropTypes from 'prop-types';

//const PassengerJobItem = (props) => {
class PassengerJobItem extends React.Component {

    state = {
        bid: 0
    }

    componentDidMount() {
        const {bid} = this.props.details;
        this.setState({bid});
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    itemStyle = () => {
        return {
            padding: "3px",
            background: this.state.bid <= 0
                ? '#f4f4f4'
                : 'lime',
            border: '1px #ccc'
        }
    }
            

    render() {
        const {uname, startDateTime, endDateTime, 
            origin, end, seats, bid} = this.props.details;
        return (
            <div style={this.itemStyle()}>
                <p>Driver: {uname} | 
                   Origin: {origin} | 
                   Destination {end} | 
                </p><p>
                   Start: {startDateTime} | 
                   End: {endDateTime} | 
                   Seats: {seats} 
                   <input
                    value={this.state.bid}
                    type="number"
                    name="bid"
                    onChange={this.onChange}
                    maxLength="7"
                    />
                   <button 
                    onClick={this.props.markBid
                        .bind(this, uname, startDateTime, this.state.bid)}
                   >BID</button> 
                </p>
            </div>
        );
    }
}


PassengerJobItem.propTypes = {
    markBid: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
}

export default PassengerJobItem;
