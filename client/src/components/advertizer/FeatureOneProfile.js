import React from 'react';
import { getFeatureOne } from '../../actions/adActions';
import { connect } from 'react-redux';
import FeatureCardOne from './FeatureCardOne'

class FeatureOneProfile extends React.Component {
    componentDidMount() {
	    this.props.getFeatureOne();
    }

    render() {
        console.log(this.props.ads);
        const { feature1 } = this.props.ads;

        const featureCards = feature1.sort((x,y) => x.num_posted > y.num_posted ? -1 : 1).map(feature => ( 
            <FeatureCardOne 
            key={feature.uname}
            feature={feature} 
            />
        )); //<JobCard />;

        return (
            <div>
                <h1>Total Number Of Advertisers</h1>
                {featureCards}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ads: state.ads,
    login: state.login
});

export default connect(
    mapStateToProps,
    {getFeatureOne }
)(FeatureOneProfile);
