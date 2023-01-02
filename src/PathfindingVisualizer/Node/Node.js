import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render() {
        const { col, row, isFinish, isStart, isVisited, onClickFunc } = this.props;
        //tarnary operator with if else
        const extraClassName = isFinish
            ? 'node-finish'
            : isStart
                ? 'node-start'
                : isVisited
                    ? 'node-visited'
                    : '';

        return <div
            onClick={() => onClickFunc(col, row)}
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
        ></div>;
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};