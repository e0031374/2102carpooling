import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import RideAds from './RideAds';


const RideAdsCard = (props) => {
    const {advertid, advertiser, ridedate, start_time, est_trip_time, origin, destination, misc_advert} = props.job;
    const title = `${advertid}: ${origin} -> ${destination}`;
    const description = `Time: ${start_time.substring(0,8)}, Est: ${est_trip_time} mins`;
    const meta = `Date: ${ridedate.substring(0,10)}`;
    const extra = `Driver: ${advertiser}, ${misc_advert}`;
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
                <RideAds job={props.job}/>
            </a>
        </Card.Content>
    </Card>
    );
}

RideAdsCard.propTypes = {
    job: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default RideAdsCard;

