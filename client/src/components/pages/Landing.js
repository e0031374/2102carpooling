import React from 'react';
import Header from '../layout/Header';
import {Input, Menu, Segment, Grid} from 'semantic-ui-react';
import Home from './Home';
import Driver from './Driver';
import Passenger from './Passenger';
import Advertizer from './Advertizer';
import Settings from './Settings';
import Member from './Member';
import Ewallet from './Ewallet';
import History from './History';
import styles from '../../static/css/Home.module.css';
import { connect } from 'react-redux';
import { getMembers } from '../../actions/memberActions';
import { getInsuranceCompanies, getAreas, getConfirmBid, getDriverJobs, } from '../../actions/driverActions';
import { getBalance } from '../../actions/ewalletActions';
import { Redirect } from  'react-router-dom';

class Landing extends React.Component {
    state = { activeItem: 'home' }
    handleItemClick = (e, {name}) => this.setState({activeItem:name});

    componentDidMount() {
        this.props.getMembers();
        this.props.getAreas();
        this.props.getDriverJobs(this.props.login.user);
        this.props.getBalance(this.props.login.user);
        this.props.getConfirmBid(this.props.login.user);
        console.log(this.props.ewallet);
        console.log(this.props.login);
    }

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'home' ? <Home/>
            : activeItem === 'passenger' ? <Passenger/>
            : activeItem === 'driver' ? <Driver/>
            : activeItem === 'advertizer' ? <Advertizer/>
            : activeItem === 'settings' ? <Settings/>
            : activeItem === 'member' ? <Member/>
            : activeItem === 'ewallet' ? <Ewallet/>
//            : activeItem === 'history' ? <History/>
            : <Home/>;

	    if (this.props.login.user === "") return <Redirect to='/' />
        return (
            <div>
                <div className={styles.landingStyle}>
                    <h2>CARPOOLING: a 2102 project</h2>
                </div>
                <Menu attached='top' tabular>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='passenger'
                        active={activeItem === 'passenger'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='driver'
                        active={activeItem === 'driver'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='advertizer'
                        active={activeItem === 'advertizer'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='settings'
                        active={activeItem === 'settings'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='member'
                        active={activeItem === 'member'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='ewallet'
                        active={activeItem === 'ewallet'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <Segment attached='bottom'>
                    {renderItem}
                </Segment>
            </div>
        );
    }
}

                    //<Menu.Item
                    //    name='history'
                    //    active={activeItem === 'history'}
                    //    onClick={this.handleItemClick}
                    ///>

const mapStateToProps = state => ( {
    login: state.login,
    ewallet: state.ewallet,
});

export default connect(
    mapStateToProps,
    {getMembers, getBalance, getAreas, getConfirmBid, getDriverJobs}
)(Landing);
