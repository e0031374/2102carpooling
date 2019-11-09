import React from 'react';
import { Link } from 'react-router-dom';
import AdsProfile from './AdsProfile';
import TopProfile from './TopProfile';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAds, getTops } from '../../actions/adActions';

class HomeSidebar extends React.Component {
    state = { activeItem: 'Sponsored Ads' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
        this.props.getAds();
        this.props.getTops();
    }

    render() {
        const { activeItem } = this.state;
        const renderItem = activeItem === 'Sponsored Ads'
            ? <AdsProfile/>
//            : activeItem === 'confirmprofile' ? <ConfirmProfile/>
            : activeItem === 'Hall Of Fame' ? <TopProfile/>
//            : activeItem === 'insurance' ? <Insurance/>
            : <AdsProfile/>;

        return (
            <div>
            <Grid container>
            <Grid.Row>
                <Grid.Column width={4}>
                <Menu pointing seconday vertical>
                    <Menu.Item
                        name='Sponsored Ads'
                        active={activeItem === 'Sponsored Ads'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Hall Of Fame'
                        active={activeItem === 'Hall Of Fame'}
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
    {getAds, getTops}
)(HomeSidebar);
//export default HomeSidebar;

