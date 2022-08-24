import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../Algorithm/dijkstra'
import './pathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
        };
    }

    /*creating node with 15 row and 50 column*/
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    //goes throuth all the nodes that we visited in order, for every node we are going to create new node of that node and we mark that one is "isVisited" and then we update our state (which is our grid) with that new node
   /* animateDijkstra(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                //copy the grid
                const newGrid = this.state.grid.slice();
                const newNode =
                {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({ grid: newGrid });
                // document.getElementById(`node-${node.row}-${node.col}`).className =
                //     'node node-visited';
            }, 10 * i);
        }
    } */

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        //   if (i === visitedNodesInOrder.length) {
        //     setTimeout(() => {
        //       this.animateShortestPath(nodesInShortestPathOrder);
        //     }, 10 * i);
        //     return;
        //   }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
              console.log(node);
          }, 25 * i);
        }
      } 

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        //call dijkstra algorithm which gives us the array of visited node in order
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        //call animateDijkstra
        this.animateDijkstra(visitedNodesInOrder);
    }



    render() {
        const { grid } = this.state;
        
        return (
            <>
                <button className='btn' onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>

                <div className='grid'>
                    {
                        grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {
                                        row.map((node, nodeIdx) => {
                                            const {row, col, isStart, isFinish, isVisited } = node;
                                            return (
                                                //here i passed down properties based on the node (one start and one finish)
                                                <Node
                                                    col={col}
                                                    row={row}
                                                    key={nodeIdx}
                                                    isStart={isStart}
                                                    isFinish={isFinish}
                                                    isVisited={isVisited}
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

//get the initial grid
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(creatNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

//this method add some property that we might need later on (in the algorithm)
const creatNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
    };
};

export default PathfindingVisualizer;