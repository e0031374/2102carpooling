import React from 'react';
import Empty from '../member/Empty';
import SearchDriverItems from './SearchDriverItems';
import SearchDriverCard from './SearchDriverCard';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import { getSearchDrivers } from '../../actions/memberActions';
import { getFeatureTwo } from '../../actions/adActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const initialState = {
        isLoading: false,
        results: [],
        value: '',
        select: false,
    // we do not put source here since state will be periodically
    // overwritten with initialState and we will lose source
}

const resultRenderer = ({ drivername}) => <Label content={drivername} />;

class SearchDriver extends React.Component {

    componentDidMount() {
        // getting SearchDrivers here doesnt work for some reason i have 
        // placed them in the landing.js
        // this is a hack around it but F!@K
        //this.props.getSearchDrivers();
        const members = this.props.ads.feature2;
        console.log(members);
        console.log(this.props.ads);
        //const source = members;
        const source = members.map(( { drivername, total_rides, avg_rating} ) => ({
            drivername,
            total_rides,
            avg_rating: avg_rating.substring(0,4),
        }));
        this.setState({ source });
        console.log(this.state);
    }

    state = initialState;

    handleResultSelect = (e, {result}) => { 
        this.setState({ value:result.drivername, select: true });
    }

    handleSearchChange = (e, {value}) => {
        this.setState({ isLoading: true, value, select: false });

        setTimeout(() => {
            const members = this.state.members;
            if (this.state.value.length < 1) {
                this.setState(initialState)
                this.setState({ members })
                return
            }

            //const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const re = new RegExp(escapeRegExp(this.state.value), 'i');
            const isMatch = (result) => re.test(result.drivername);

            this.setState({
                isLoading: false,
                results: this.state.source.filter(isMatch),
                //results: _.filter(source, isMatch),
            });
        }, 300);
    }

    render() {
        const { isLoading, value, results } = this.state;
        const selected = this.state.results.find(obj => {
            return obj.drivername == value;
        })
        const displayResult = this.state.select
            ? <SearchDriverCard member={selected}/>
            : this.state.results.length < 1
                ? <Empty/>
                : <SearchDriverItems members={results}/>;


        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        resultRenderer={resultRenderer}
                        //onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        //    leading: true,
                        //})}
                        results={results}
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment>
                        {displayResult}    
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

// create a card and model for user?

const searchContainer = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
}

const resultContainer = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
}
//https://github.com/lodash/lodash/blob/master/escapeRegExp.js
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = RegExp(reRegExpChar.source)

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @see escape, escapeRegExp, unescape
 * @example
 *
 * escapeRegExp('[lodash](https://lodash.com/)')
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : (string || '')
}
//export default times

SearchDriver.propTypes = {
    member: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    member: state.member,
    ads: state.ads,
    login: state.login,
});

export default connect(
    mapStateToProps, 
    {getFeatureTwo}
)(SearchDriver);
