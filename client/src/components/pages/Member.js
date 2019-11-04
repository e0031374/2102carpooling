import React from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';

const initialState = {
        isLoading: false,
        results: [],
        value: '',
}

const members = [
    {
        uname: "root",
        bios: "the first",
        rating: 2,
    },{
        uname: "user",
        bios: "generic user",
        rating: 1,
    }, {
        uname: "rogers",
        bios: "70 old vet",
        rating: 0,
    }, {
        uname: "stark",
        bios: "you know who i am",
        rating: 2,
    }, {
        uname: "banner",
        bios: "green",
        rating: 1,
    }
]

//const source = _.times(5, () => ({
//    uname: 
//    description:
//    rating: 
//}));
//const source = _.times(5, (member) => ({
//    uname: member.uname,
//    description: member.bios,
//    rating: member.rating,
//}));
const source = members.map((member) => ({
    uname: member.uname,
    description: member.bios,
    rating: member.rating,
}));

class Member extends React.Component {
    state = initialState;

    handleResultSelect = (e, {result}) => this.setState({ value:result.uname });
    handleSearchChange = (e, {value}) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            //const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const re = new RegExp(escapeRegExp(this.state.value), 'i');
            const isMatch = (result) => re.test(result.uname);

            this.setState({
                isLoading: false,
                results: source.filter(isMatch),
                //results: _.filter(source, isMatch),
            });
        }, 300);
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
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
                        <Header>State</Header>
                        <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(this.state, null, 2)}
                        </pre>
                        <Header>Options</Header>
                        <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(this.state, null, 2)}
                        </pre>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
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


export default Member;
