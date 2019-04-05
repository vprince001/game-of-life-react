import React from 'react';
import "./World.css";
import nextGeneration from './gameOfLifeSrc';

class TableData extends React.Component {

  render() {
    return (
      <div id={this.props.id} className='cell' onClick={this.props.clickEvent}></div>
    )
  }
}

class TableRow extends React.Component {

  render() {
    let row = new Array(15).fill(0);

    let grid = row.map((data, columnIndex) => {
      let id = this.props.rowIndex + "," + columnIndex;
      return <TableData id={id} key={id} clickEvent={this.props.clickEvent} />;
    })
    return <div id={this.props.rowIndex} className="row">{grid}</div>;
  }
}

class Table extends React.Component {
  render() {
    let table = new Array(15).fill(0);

    table = table.map((row, rowIndex) => {
      return <TableRow rowIndex={rowIndex} key={rowIndex} clickEvent={this.props.clickEvent} />
    })
    return <div>{table}</div>;
  }
}

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGeneration: [],
      bounds: {
        topLeft: [0, 0],
        bottomRight: [14, 14]
      }
    }
    this.handleClick = this.handleClick.bind(this);
    this.nextState = this.nextState.bind(this);
    this.interval = null;
  }

  getCellCoordinates(cellId) {
    let coordinates = cellId.split(",");
    let x = parseInt(coordinates[0]);
    let y = parseInt(coordinates[1]);
    return [x, y];
  }

  changeCellColor(cellId) {
    let cell = document.getElementById(cellId);
    cell.style.backgroundColor = "green";
  }

  handleClick(e) {
    let cellId = e.target.id;
    this.changeCellColor(cellId);
    let cellCoordinates = this.getCellCoordinates(cellId);
    let currGeneration = this.state.currentGeneration.slice();
    currGeneration.push(cellCoordinates);
    this.setState({ currentGeneration: currGeneration });
  }

  nextState() {
    let aliveCells = nextGeneration(this.state.currentGeneration, this.state.bounds);
    let coordinates = "";

    this.state.currentGeneration.map(function (cellCoordinates) {
      coordinates = cellCoordinates[0] + "," + cellCoordinates[1];
      document.getElementById(coordinates).style.backgroundColor = "white";
    })

    aliveCells.map(function (cellCoordinates) {
      coordinates = cellCoordinates[0] + "," + cellCoordinates[1];
      document.getElementById(coordinates).style.backgroundColor = "green";
    })
    this.updateCurrentGeneration(aliveCells);
  }

  updateCurrentGeneration(cells) {
    this.setState({ currentGeneration: cells })
  }

  startGame() {
    this.interval = setInterval(() => this.nextState(), 500);
  }

  stopGame() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="game">
        <div className="world">
          <Table clickEvent={this.handleClick} />
        </div>
        <div className="buttonPanel" >
          <button onClick={this.startGame.bind(this)}>Start</button>
          <button onClick={this.stopGame.bind(this)}>Stop</button>
        </div>
      </div>
    )
  }
}


export default World;