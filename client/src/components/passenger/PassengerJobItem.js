import React from 'react'
import PropTypes from 'prop-types';
import Card from '../layout/Card';

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
            display: 'inline-block',
            background: this.state.bid <= 0
                ? '#f4f4f4'
                : 'lime',
            border: '1px #ccc'
        }
    }
            

    render() {
        const {driver, startDateTime, endDateTime, 
            origin, end, seats, bid} = this.props.details;

        const content = <div>
                <p> {'Start: '} {startDateTime} 
                    {'    End: '} {endDateTime} </p>
                <p> {'Seats: '} {seats} </p>
                <p> {'Bid: '} {seats} 
                   <input
                    value={this.state.bid}
                    type="number"
                    name="bid"
                    onChange={this.onChange}
                    maxLength="7"
                    />
                   <button 
                    onClick={this.props.markBid
                        .bind(this, driver, startDateTime, this.state.bid)}
                   >BID</button> 
                </p>
            </div>

        return (
            <div style={this.itemStyle()}>
                <Card
                    title={driver + " : " + origin + " -> " + end}
                    msg={content}
                />
            </div>
        );
    }
}


PassengerJobItem.propTypes = {
    markBid: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
}

export default PassengerJobItem;
