const { extractLimits, getAllCoordinates, contains, getNeighbours, verifyRules } = require("./lib.js");

const nextGeneration = function (currGeneration, bounds) {
  let limits = extractLimits(bounds);
  let allCoordinates = getAllCoordinates(limits);
  let includes = contains.bind(null, currGeneration);
  let aliveCells = [];

  for (let coordinate of allCoordinates) {
    let neighbours = getNeighbours(coordinate, limits);
    let numOfNeighbours = neighbours.filter(includes).length;

    if ((numOfNeighbours == 2 && contains(currGeneration, coordinate)) || verifyRules(numOfNeighbours) == 1)
      aliveCells.push(coordinate);
  }
  return aliveCells;
};

export default nextGeneration;