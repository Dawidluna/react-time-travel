import React from 'react';
import '../index.css';
import Tile from './Tile';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerX: [],
            playerY: [],
            points: []
        }
        this.undoMove = this.undoMove.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.moveEvent);
        let playerX = [];
        playerX.push(0);
        let playerY = [];
        playerY.push(0);
        let points = [];
        points.push(0);
        this.setState({playerX: playerX, playerY: playerY, points: points});
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.moveEvent);
    }

    moveEvent = (event) => {
        let code = event.which || event.keyCode;
        switch(code) {
            case 37:
                if(this.state.playerX.at(-1) > 0) {
                    if(!(this.state.playerX.at(-1) === 4 && this.state.playerY.at(-1) === 4)) {
                        let tempX = this.state.playerX;
                        tempX.push(this.state.playerX.at(-1)-1);
                        let tempY = this.state.playerY;
                        tempY.push(this.state.playerY.at(-1));
                        let tempP = this.state.points;
                        tempP.push(tempP.at(-1) + this.props.board[tempY.at(-1)][tempX.at(-1)]);
                        this.setState({playerX: tempX, playerY: tempY, points: tempP});
                    }
                }
                return;
            case 38:
                if(this.state.playerY.at(-1) > 0) {
                    if(!(this.state.playerX.at(-1) === 4 && this.state.playerY.at(-1) === 4)) {
                        let tempX = this.state.playerX;
                        tempX.push(this.state.playerX.at(-1));
                        let tempY = this.state.playerY;
                        tempY.push(this.state.playerY.at(-1)-1);
                        let tempP = this.state.points;
                        tempP.push(tempP.at(-1) + this.props.board[tempY.at(-1)][tempX.at(-1)]);
                        this.setState({playerX: tempX, playerY: tempY, points: tempP});
                    }
                }
                return;
            case 39:
                if(this.state.playerX.at(-1) < 4) {
                    if(this.state.points.at(-1) === this.props.board[4][4] || !(this.state.playerX.at(-1) === 3 && this.state.playerY.at(-1) === 4)) {
                        let tempX = this.state.playerX;
                        tempX.push(this.state.playerX.at(-1)+1);
                        let tempY = this.state.playerY;
                        tempY.push(this.state.playerY.at(-1));
                        let tempP = this.state.points;
                        tempP.push(tempP.at(-1) + this.props.board[tempY.at(-1)][tempX.at(-1)]);
                        this.setState({playerX: tempX, playerY: tempY, points: tempP});
                        if(this.state.playerX.at(-1) === 4 && this.state.playerY.at(-1) === 4) {
                            tempP.push("Gratulacje, wygrałeś!");
                            this.setState({points: tempP});
                        }
                    }
                }
                return;
            case 40:
                if(this.state.playerY.at(-1) < 4) {
                    if(this.state.points.at(-1) === this.props.board[4][4] || !(this.state.playerX.at(-1) === 4 && this.state.playerY.at(-1) === 3)) {
                        let tempX = this.state.playerX;
                        tempX.push(this.state.playerX.at(-1));
                        let tempY = this.state.playerY;
                        tempY.push(this.state.playerY.at(-1)+1);
                        let tempP = this.state.points;
                        tempP.push(tempP.at(-1) + this.props.board[tempY.at(-1)][tempX.at(-1)]);
                        this.setState({playerX: tempX, playerY: tempY, points: tempP});
                        if(this.state.playerX.at(-1) === 4 && this.state.playerY.at(-1) === 4) {
                            tempP.push("Gratulacje, wygrałeś!");
                            this.setState({points: tempP});
                        }
                    }
                }
                return;
        }
    }

    undoMove() {
        let tempX = this.state.playerX;
        let tempY = this.state.playerY;
        let tempP = this.state.points;
        if(tempP.length > 1 && tempP.at(-1) !== "Gratulacje, wygrałeś!") {
            tempX.pop();
            tempY.pop();
            tempP.pop();
            this.setState({playerX: tempX, playerY: tempY, points: tempP});
        }
    }

    render() {
        const board = [];
        for(let i=0; i<5; i++) {
            const row = [];
            for(let j=0; j<5; j++) {
                let isPlayer = false;
                if(this.state.playerX.at(-1) === j && this.state.playerY.at(-1) === i) isPlayer = true;
                row.push(<Tile row={i} col={j} val={this.props.board[i][j]} isPlayer={isPlayer}/>);
            }
            board.push(row);
        }
        return(
            <div id="board"><p id="points">{this.state.points.at(-1)}</p>{board}<button onClick={()=> this.undoMove()}>Confij ruch</button></div>
        );
    }
}