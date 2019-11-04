import React from 'react';
import Header from '../layout/Header';
import {Input, Menu, Segment, Grid} from 'semantic-ui-react';
import Home from './Home';
import Driver from './Driver';
import Passenger from './Passenger';
import Advertizer from './Advertizer';
import Settings from './Settings';

class Landing extends React.Component {
    state = { activeItem: 'home' }
    handleItemClick = (e, {name}) => this.setState({activeItem:name});

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'home' ? <Home/>
            : activeItem === 'passenger' ? <Passenger/>
            : activeItem === 'driver' ? <Driver/>
            : activeItem === 'advertizer' ? <Advertizer/>
            : activeItem === 'settings' ? <Settings/>
            : <Home/>;

        return (
            <div>
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
                </Menu>
                <Segment attached='bottom'>
                    {renderItem}
                </Segment>
            </div>
        );
    }
}


export default Landing;
