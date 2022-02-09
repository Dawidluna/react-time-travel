import React from 'react';
import '../index.css';

export default class Tile extends React.Component {
    render() {
        if(this.props.isPlayer) {
            return(
                <div id="playerTile"><h1>{this.props.val}</h1></div>
            );
        }
        else {
            return(
            <div id="tile"><h1>{this.props.val}</h1></div>
        );
            }
    }
}