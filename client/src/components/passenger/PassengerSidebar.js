import React from 'react';
import { Link } from 'react-router-dom';
import PassengerPanel from './PassengerPanel';
import SearchDriver from './SearchDriver';
import FeatureThreeProfile from './FeatureThreeProfile';
import WinProfile from './WinProfile';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getJobs, deleteJob } from '../../actions/jobActions';
import { getFeatureTwo, getFeatureThree } from '../../actions/adActions';
import { getSearchDriverCompanies } from '../../actions/driverActions';
import { getWinBids } from '../../actions/passengerActions';

class PassengerSidebar extends React.Component {
    state = { activeItem: 'passengerpanel' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
        this.props.getWinBids(this.props.login.user);
        this.props.getFeatureTwo();
        this.props.getFeatureThree();
    }

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'passengerpanel'
            ? <PassengerPanel/>
            : activeItem === 'winprofile' ? <WinProfile/>
            : activeItem === 'searchdriver' ? <SearchDriver/>
            : activeItem === 'Bidding Report' ? <FeatureThreeProfile/>
            : <PassengerPanel/>;
        console.log(this.props.passenger);

        return (
            <div style={container}>
            <Grid container>
            <Grid.Row>
                <Grid.Column width={4}>
                <Menu pointing seconday vertical>
                    <Menu.Item
                        name='passengerpanel'
                        active={activeItem === 'passengerpanel'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='winprofile'
                        active={activeItem === 'winprofile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='searchdriver'
                        active={activeItem === 'searchdriver'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Bidding Report'
                        active={activeItem === 'Bidding Report'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                    {renderItem}
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            </div>
        );
    }


}
const container = {
}

//const PassengerSidebar = (props) => {
//    return (
//        <div> 
//            <h3>Driver Stuff</h3>
//            <ul>
//                <li><Link to="/driver/passengerpanel">Job Profile</Link></li>
//                <li><Link to="/driver/winprofile">Car Profile</Link></li>
//                <li><Link to="/driver/searchdriver">Buy SearchDriver</Link></li>
//            </ul>
//        </div>
//    );
//}


const mapStateToProps = (state) => ({
    login: state.login,
    job: state.job
});

export default connect(
    mapStateToProps, 
    { getWinBids, getFeatureTwo, getFeatureThree }
)(PassengerSidebar);
//export default PassengerSidebar;

