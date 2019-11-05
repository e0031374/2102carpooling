import React from 'react';
import Empty from '../member/Empty';
import MemberItems from '../member/MemberItems';
import MemberCard from '../member/MemberCard';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const initialState = {
        isLoading: false,
        results: [],
        value: '',
        select: false,
}

const resultRenderer = ({ uname }) => <Label content={uname} />;

class Member extends React.Component {

    componentDidMount() {
        const members = this.props.member.members;
        const source = members.map((member) => ({
            uname: member.uname,
            description: member.bios,
            rating: member.rating,
        }));
        this.setState({ source });
    }

    state = initialState;

    handleResultSelect = (e, {result}) => { 
        this.setState({ value:result.uname, select: true });
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
            const isMatch = (result) => re.test(result.uname);

            this.setState({
                isLoading: false,
                results: this.state.source.filter(isMatch),
                //results: _.filter(source, isMatch),
            });
        }, 300);
    }

    render() {
        const { isLoading, value, results } = this.state;
        const displayResult = this.state.select
            ? <MemberCard member={this.state.results[0]}/>
            : this.state.results.length < 1
                ? <Empty/>
                : <MemberItems members={results}/>;


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
                //<Grid.Column width={6}>
                //<Grid.Column width={10}>
                        //<Header>State</Header>
                        //<pre style={{ overflowX: 'auto' }}>
                        //    {JSON.stringify(this.state, null, 2)}
                        //</pre>
                        //<Header>Options</Header>
                        //<pre style={{ overflowX: 'auto' }}>
                        //    {JSON.stringify(this.state, null, 2)}
                        //</pre>

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

//export default escapeRegExp

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument: (index).
 *
 * @since 0.1.0
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
function times(n, iteratee) {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index = -1
  const length = Math.min(n, MAX_ARRAY_LENGTH)
  const result = new Array(length)
  while (++index < length) {
    result[index] = iteratee(index)
  }
  index = MAX_ARRAY_LENGTH
  n -= MAX_ARRAY_LENGTH
  while (++index < n) {
    iteratee(index)
  }
  return result
}

//export default times

Member.propTypes = {
    member: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    member: state.member,
});

export default connect(
    mapStateToProps, 
    {}
)(Member);
