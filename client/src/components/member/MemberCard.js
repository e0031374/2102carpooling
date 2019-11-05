import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MemberRatingForm from './MemberRatingForm';


const MemberCard = (props) => {
    return (
    <Card>
        <Card.Content>
            <Card.Header>{props.member.uname}</Card.Header>
            <Card.Meta>
                {props.member.description}
            </Card.Meta>
            <Card.Description>
                {`Rating ${props.member.rating}`}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <MemberRatingForm/>
            </a>
        </Card.Content>
    </Card>
    );
}

MemberCard.propTypes = {
    member: PropTypes.object.isRequired
}


export default MemberCard;

