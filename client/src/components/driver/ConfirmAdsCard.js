import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ConfirmAds from './ConfirmAds';


const ConfirmAdsCard = (props) => {
    const {advertid, advertiser, ridedate, start_time, est_trip_time, origin, destination, misc_advert, bidder, bid_amount} = props.job;
    const title = `${advertid}: ${origin} -> ${destination}`;
    const description = `Bidder: ${bidder}, Bid: ${bid_amount} dollars`;
    const meta = `Date: ${ridedate.substring(0,10)} \nTime: ${start_time.substring(0,8)}, Est: ${est_trip_time} mins`;
    const extra = `${misc_advert}`;
    return (
    <Card>
        <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
                {meta}
            </Card.Meta>
            <Card.Description>
                {description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                {extra}
                <ConfirmAds job={props.job}/>
            </a>
        </Card.Content>
    </Card>
    );
}

ConfirmAdsCard.propTypes = {
    job: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default ConfirmAdsCard;

