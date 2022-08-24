// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

//taking grid startnode and finishnode as parameter
export function dijkstra(grid, startNode, finishNode) {
    //no ds we use, only this array for keeping track of closest unvisited node by distance is 
    const visitedNodesInOrder = [];
    //set the distance of start node to 0;
    startNode.distance = 0;
    //set unvisited nodes to get all the nodes
    const unvisitedNodes = getAllNodes(grid);

    //visit this node  and update all the neignbouring node of this node
    //these node now have distance of whatever my current distance is +1
    //we have all our nodes that are distance of infinity except of starting node distance of 0 and suddenly update the four neighbouring node to be at a distance of 0+1, eliminate the visited node, then closest node of all the remaining node, again all of them are at a distance of infinity except four of them that are distance of 1, pick one of the four and keep doing this process 
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        //closest node is write below here
        const closestNode = unvisitedNodes.shift();
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        //after every closest node, I just append the closest node to this array of visitedNodesInOrder, because we need to animate the node we visited in order
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        //when closest node is the finish node and we are done
        //visitedNodesInOrder return an array of visited nodes
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

//sorting the array everytime based on their distance  
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

//getting all the nodes
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}





