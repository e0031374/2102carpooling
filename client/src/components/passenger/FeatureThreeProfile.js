import React from 'react';
import { getFeatureThree } from '../../actions/adActions';
import { connect } from 'react-redux';
import FeatureCardThree from './FeatureCardThree'

class FeatureThreeProfile extends React.Component {
    componentDidMount() {
	    this.props.getFeatureThree();
    }

    render() {
        console.log(this.props.ads);
        const { feature3 } = this.props.ads;

        const featureCards = feature3.sort((x,y) => x.num_posted > y.num_posted ? -1 : 1).map(feature => ( 
            <FeatureCardThree 
            key={feature.uname}
            feature={feature} 
            />
        )); //<JobCard />;

        return (
            <div>
                <h1>Bidding Report Summary</h1>
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
    {getFeatureThree }
)(FeatureThreeProfile);
