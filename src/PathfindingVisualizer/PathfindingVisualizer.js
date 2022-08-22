import React, { Component } from 'react';
import Node from './Node/Node';
import './pathfindingVisualizer.css';

class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    /*creating node with 15 row and 50 column*/
    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                //initialize start and end node with the object currentNode
                const currentNode = {
                    col,
                    row,
                    isStart: row === 10 && col === 5,
                    isFinish: row === 10 && col === 45,
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({ nodes })
    }

    render() {
        const { nodes } = this.state;
        console.log(nodes);

        return (
            <>
                <button className='btn'>
                    Visualize Dijkstra's Algorithm
                </button>

                <div className='grid'>
                    {
                        nodes.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {
                                        row.map((node, nodeIdx) => {
                                            const { isStart, isFinish } = node;
                                            return (
                                                //here i passed down properties based on the node (one start and one finish)
                                                <Node
                                                    key={nodeIdx}
                                                    isStart={isStart}
                                                    isFinish={isFinish}
                                                    test={'foo'}
                                                ></Node>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </>
        );
    }
}

export default PathfindingVisualizer;