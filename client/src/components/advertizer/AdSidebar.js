import React from 'react';
import { Link } from 'react-router-dom';
import AddAdItem from './AddAdItem';
import FeatureOneProfile from './FeatureOneProfile';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAds, getFeatureOne } from '../../actions/adActions';

class AdSidebar extends React.Component {
    state = { activeItem: 'addaditem' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
        this.props.getAds();
        this.props.getFeatureOne();
    }

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'addaditem'
            ? <AddAdItem/>
            : activeItem === 'Advertizer Statistics' ? <FeatureOneProfile/>
//            : activeItem === 'carprofile' ? <CarProfile/>
//            : activeItem === 'insurance' ? <Insurance/>
            : <AddAdItem/>



        return (
            <div>
            <Grid container>
            <Grid.Row>
                <Grid.Column width={4}>
                <Menu pointing seconday vertical>
                    <Menu.Item
                        name='addaditem'
                        active={activeItem === 'addaditem'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Advertizer Statistics'
                        active={activeItem === 'Advertizer Statistics'}
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

                    //<Menu.Item
                    //    name='carprofile'
                    //    active={activeItem === 'carprofile'}
                    //    onClick={this.handleItemClick}
                    ///>
                    //<Menu.Item
                    //    name='insurance'
                    //    active={activeItem === 'insurace'}
                    //    onClick={this.handleItemClick}
                    ///>

const mapStateToProps = (state) => ({
    login: state.login,
    ads: state.ads
});

export default connect(
    mapStateToProps, 
    {getAds, getFeatureOne}
)(AdSidebar);
//export default AdSidebar;

