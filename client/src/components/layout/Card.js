import React from 'react';

class Card extends React.Component {
    state = {
        hover: false
    };

    onMouseEnterHandler = () => {
        this.setState({ hover: true });
    }

    onMouseLeaveHandler = () => {
        this.setState({ hover: false });
    }
            
    render() {
        let inner = cardStyle;
        if (this.state.hover) {
            inner = hover
        }

        return (
            <div style={container}>
                <div style={inner}
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseLeave={this.onMouseLeaveHandler}
                >
                    <h4><b>{this.props.title}</b></h4>
                    <p>{this.props.msg}</p>
                </div>
            </div>
        );
    }
}

//https://stackoverflow.com/questions/29981236/how-do-you-hover-in-reactjs-onmouseleave-not-registered-during-fast-hover-ove
//

const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px', /* 5px rounded corners */
    padding: '2px 16px',
    margin: '10px',
}

const container = {
}

const hover = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px', /* 5px rounded corners */
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    padding: '2px 16px',
    margin: '10px',
}

///* On mouse-over, add a deeper shadow */
//.card:hover {
//      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
//}
//
///* Add some padding inside the card container */
//.container {
//}

export default Card;
