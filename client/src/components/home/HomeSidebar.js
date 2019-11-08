import React from 'react';
import { Link } from 'react-router-dom';
import AdsProfile from './AdsProfile';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAds } from '../../actions/adActions';

class HomeSidebar extends React.Component {
    state = { activeItem: 'adsprofile' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
        this.props.getAds();
    }

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'adsprofile'
            ? <AdsProfile/>
//            : activeItem === 'confirmprofile' ? <ConfirmProfile/>
//            : activeItem === 'carprofile' ? <CarProfile/>
//            : activeItem === 'insurance' ? <Insurance/>
            : <AdsProfile/>;

        return (
            <div>
            <Grid container>
            <Grid.Row>
                <Grid.Column width={4}>
                <Menu pointing seconday vertical>
                    <Menu.Item
                        name='adsprofile'
                        active={activeItem === 'adsprofile'}
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
                    //    name='confirmprofile'
                    //    active={activeItem === 'confirmprofile'}
                    //    onClick={this.handleItemClick}
                    ///>
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
    {getAds}
)(HomeSidebar);
//export default HomeSidebar;

