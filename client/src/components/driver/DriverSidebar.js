import React from 'react';
import { Link } from 'react-router-dom';
import JobProfile from './JobProfile';
import CarProfile from './subpages/CarProfile';
import Insurance from './subpages/Insurance';
import { Menu, Grid, Segment } from 'semantic-ui-react';

class DriverSidebar extends React.Component {
    state = { activeItem: 'jobprofile' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'jobprofile'
            ? <JobProfile/>
            : activeItem === 'carprofile' ? <CarProfile/>
            : activeItem === 'insurance' ? <Insurance/>
            : <JobProfile/>;

        return (
            <div style={container}>
            <Grid container>
            <Grid.Row>
                <Grid.Column width={4}>
                <Menu pointing seconday vertical>
                    <Menu.Item
                        name='jobprofile'
                        active={activeItem === 'jobprofile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='carprofile'
                        active={activeItem === 'carprofile'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='insurance'
                        active={activeItem === 'insurace'}
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

//const DriverSidebar = (props) => {
//    return (
//        <div> 
//            <h3>Driver Stuff</h3>
//            <ul>
//                <li><Link to="/driver/jobprofile">Job Profile</Link></li>
//                <li><Link to="/driver/carprofile">Car Profile</Link></li>
//                <li><Link to="/driver/insurance">Buy Insurance</Link></li>
//            </ul>
//        </div>
//    );
//}


export default DriverSidebar;

