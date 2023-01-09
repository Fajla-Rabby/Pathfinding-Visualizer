import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithm/dijkstra'
import { bfs, bfsgetNodesInShortestPathOrder } from '../Algorithm/bfs';
import './pathfindingVisualizer.css';

class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            startValue: {
                row: 10, //initial value
                col: 15,
            },
            endValue: {
                row: 10,
                col: 35,
            },
            startOrEnd: "start",
            speed: 25,

        };

    }
    // state = {
    //     col:  this.props.col,
    //   };

    /*creating node with 15 row and 50 column*/
    componentDidMount() {
        const { startValue, endValue } = this.state;
        const grid = getInitialGrid(startValue, endValue);
        this.setState({ grid });

        // const grid = getInitialGrid();
        // this.setState({ grid, });
    }

    onClickFunc = (col, row) => {
        const { startOrEnd, startValue, endValue } = this.state;

        //ekhahne amra update initial value ta k update korbo
        const updateCase = { row, col };

        if (startOrEnd === "start") {
            const grid = getInitialGrid(updateCase, endValue); //here we only updated  the startValue that's why this function is called by providing updateCase as the value of startValue
            this.setState((prev) => {
                return { ...prev, startValue: updateCase, grid, startOrEnd: "end" };
            });
        }

        if (startOrEnd === "end") {
            //here we only updated  the endValue that's why this function is called by providing updateCase as the value of endValue
            const grid = getInitialGrid(startValue, updateCase);
            this.setState((prev) => {
                return { ...prev, endValue: updateCase, grid };
            });
        }
    };

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

    handleSpeedChange = (event) => {
        this.setState({ speed: event.target.value });
    };

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, this.state.speed * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
                console.log(node);
            }, this.state.speed * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, this.state.speed * i);
        }
    }

    visualizeDijkstra() {
        const { grid, startValue, endValue } = this.state;
        console.log(endValue.col);
        const startNode = grid[startValue.row][startValue.col];
        const finishNode = grid[endValue.row][endValue.col];
        //call dijkstra algorithm which gives us the array of visited node in order
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        //call animateDijkstra
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBFS() {
        const { grid, startValue, endValue } = this.state;
        console.log(endValue.col);
        console.log(grid);
        const startNode = grid[startValue.row][startValue.col];
        const finishNode = grid[endValue.row][endValue.col];
        //call bfs algorithm which gives us the array of visited node in order
        const visitedNodesInOrder = bfs(grid, startNode, finishNode); // call the BFS function
        const nodesInShortestPathOrder = bfsgetNodesInShortestPathOrder(finishNode);
        this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
        console.log(visitedNodesInOrder, nodesInShortestPathOrder);

        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, this.state.speed * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, this.state.speed * i);
        }
    }

    // //increment value of nodes 
    // handleIncrement = (col) => {
    //     console.log(col); 
    //     // console.log(product);
    //     // this.setState({ value: this.state.value + 1 });
    //     // this.setState({ 'START_NODE_ROW': START_NODE_ROW + 1 }); 
    //     this.setState({ col :  this.state.col + 1 }); 
    //     console.log(col);      

    //   };

    clearBoard = () => {
        const { startValue, endValue, isVisited, visitedNodesInOrder, nodesInShortestPathOrder } = this.state;
        // TODO: reset the grid and start/end values here
        const newGrid = [];
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(creatNode(col, row, startValue, endValue));
            }
            newGrid.push(currentRow);
        }

        this.setState({
            grid: newGrid, isVisited: false, startValue: { row: 10, col: 15 }, endValue: { row: 10, col: 35 }
        });
        this.setState({ visitedNodesInOrder: [], nodesInShortestPathOrder: [] });
        console.log("newGrid", newGrid);
        console.log("isVisited", isVisited);
        console.log("visitedNodesInOrder", visitedNodesInOrder);
        console.log("nodesInshortestpathorder", nodesInShortestPathOrder);
        // console.log(visitedNodesInOrder);
    };


    render() {
        const { grid, startOrEnd } = this.state;

        //radio button er style 
        const radioStyle = {
            marginBlock: "1rem",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
        };

        // function refreshPage() {
        //     window.location.reload(false);
        //   }

        return (
            <>
                <button className='btn' onClick={() => this.visualizeDijkstra()}>
                    Start
                </button>

                <button className='btn' onClick={() => this.visualizeBFS()}>
                    BFS
                </button>

                <button className='btn' onClick={() => this.clearBoard()}>Clear Board</button>

                <input
                    type="range"
                    min={1}
                    max={500}
                    value={this.state.speed}
                    onChange={this.handleSpeedChange}
                />

                <div style={radioStyle}>
                    <input
                        onChange={this.setStartOrEndValue}
                        id="start"
                        type="radio"
                        value="start"
                        name="name"
                        checked={startOrEnd === "start"}
                    />
                    <label htmlFor="start">Select Starting Point</label>
                    <input
                        onChange={this.setStartOrEndValue}
                        id="end"
                        type="radio"
                        value="end"
                        name="name"
                        checked={startOrEnd === "end"}
                    />
                    <label htmlFor="end">Select Ending Point</label>
                </div>

                <div className='grid'>
                    {
                        grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {
                                        row.map((node, nodeIdx) => {
                                            const { row, col, isStart, isFinish, isVisited } = node;
                                            return (
                                                //here i passed down properties based on the node (one start and one finish)
                                                <Node
                                                    onClickFunc={this.onClickFunc}
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
const getInitialGrid = (startValue, endValue) => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(creatNode(col, row, startValue, endValue));
        }
        grid.push(currentRow);
    }
    return grid;
};

//this method add some property that we might need later on (in the algorithm)
const creatNode = (col, row, startValue, endValue) => {

    return {
        col,
        row,
        isStart: row === startValue.row && col === startValue.col,
        isFinish: row === endValue.row && col === endValue.col,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
    };
};

export default PathfindingVisualizer;