import React from 'react';
import { getAds } from '../../actions/adActions';
import { connect } from 'react-redux';
import AdCard from '../home/AdCard'

class AdsProfile extends React.Component {
    componentDidMount() {
	    this.props.getAds();
    }

    render() {
        const { ads } = this.props.ads;

        const adverts = ads.map(ad => ( 
            <AdCard 
            key={ad.advertid}
            ad={ad} 
            />
        )); //<JobCard />;

        return (
            <div>
                <h1>Ads Screen</h1>
                {adverts}
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
    {getAds }
)(AdsProfile);
