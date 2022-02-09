import React from 'react';
import '../index.css';
import Board from './Board';

export default class Game extends React.Component {
    render() {
        let board = [];
        for(let i=0; i<5; i++) {
            let row = [];
            for(let j=0; j<5; j++) {
                row.push(Math.ceil(Math.random()*5));
            }
            board.push(row);
        }
        board[0][0] = 0;
        let randomPath = [0,0,0,0,1,1,1,1];
        for (let i = 7; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomPath[i], randomPath[j]] = [randomPath[j], randomPath[i]];
        }
        let sum = 0;
        let i = 0;
        let j = 0;
        for(let k=0; k<8; k++) {
            sum += board[i][j];
            if(randomPath[k]==1) i++;
            else j++;
        }
        board[4][4] = sum;
        return(
            <Board board={board}/>       
        );
    }
}