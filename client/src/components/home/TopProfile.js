import React from 'react';
import { getTops } from '../../actions/adActions';
import { connect } from 'react-redux';
import TopCard from '../home/TopCard'

class TopProfile extends React.Component {
    componentDidMount() {
	    this.props.getTops();
    }

    render() {
        const { topdrivers } = this.props.ads;
        console.log(this.props.ads);

        const adverts = topdrivers.map(ad => ( 
            <TopCard 
            key={ad.drivername}
            ad={ad} 
            />
        )); //<JobCard />;

        return (
            <div>
                <h1>CONGRATULATIONS TO OUR DRIVERS OF THE MONTH</h1>
                <h4>here are Carpooling: a 2102 project, we believe that hard work deserves to be recognized, so here they are</h4>
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
    {getTops }
)(TopProfile);
