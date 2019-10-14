import React from 'react';
import { connect } from 'react-router';

class HomeAdverts extends React.Compenent {
    render() {
        return (
        );
    }
}

const mapStatesToProps = (state) => {
    ads: state.ads
}


export default connect(
)(HomeAdverts);
