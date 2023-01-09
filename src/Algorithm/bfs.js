
// Performs BFS algorithm; returns *all* nodes in the order
// in which they were visited.
export function bfs(grid, startNode, endNode) {
  // Create a queue for BFS
  const queue = [startNode];
  // Create a Set to store visited nodes
  const visitedNodes = new Set();
  // Set the initial node as visited
  startNode.isVisited = true;
  visitedNodes.add(startNode);

  while (queue.length > 0) {
    
    // Remove the first node from the queue and assign it to a variable "currentNode"
    const currentNode = queue.shift();

    // If the current node is the end node, return the visited nodes
    if (currentNode === endNode) return visitedNodes;

    // Get all the unvisited neighbors of the current node
    const unvisitedNodes = getAllNodes(currentNode, grid);
    sortNodesByDistance(unvisitedNodes);
    console.log(unvisitedNodes);

    // Set the isVisited property of each unvisited neighbor to "true"
    // and add them to the visited nodes set
    for (const neighbor of unvisitedNodes) {
      neighbor.isVisited = true;
      visitedNodes.add(neighbor);
    }

    // Add the unvisited neighbors to the back of the queue
    queue.push(...unvisitedNodes);
  }
}


  

//sorting the array everytime based on their distance  
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/* function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
} */

/* function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
} */
/* 
function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isWall);
  } */

/*   function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
} */
  


//getting all the nodes
function getAllNodes(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

//getting all the nodes
/* function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
} */

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function bfsgetNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

