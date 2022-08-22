import React, { Component } from 'react';
import Node from './Node/Node';
import './pathfindingVisualizer.css';

class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodes: [],
        };
    }

    /*creating node with 15 row and 50 column*/   
    componentDidMount()
    {
        const nodes = [];
        for (let row = 0; row < 15; row++)
        {
            const currentRow = [];
            for (let col = 0; col < 50; col++)
            {
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

    render() {
        const {nodes} = this.state;
        console.log(nodes);


        return (
            <>
             <button className='btn'>
          Visualize Dijkstra's Algorithm
        </button>
            <div className='grid'>
                {
                    nodes.map((row, rowIdx) =>{
                        return <div>
                            {row.map((node, nodeIdx) => <Node></Node>)}
                        </div>
                    })
                }
                
            </div>
            </>
           
        );
    }
}

export default PathfindingVisualizer;