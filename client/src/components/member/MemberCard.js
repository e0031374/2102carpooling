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
            </Card.Meta>
            <Card.Description>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <MemberRatingForm receiver={props.member.uname}/>
            </a>
        </Card.Content>
    </Card>
    );
}

MemberCard.propTypes = {
    member: PropTypes.object.isRequired
}
                //{props.member.description}

                //{`Rating ${props.member.rating}`}

export default MemberCard;

