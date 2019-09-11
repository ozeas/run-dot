import vis from 'vis-network';

import './style.css';

function runDot(DOTstring) {
  const parsedData = vis.network.convertDot(DOTstring);
  const data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges,
  };

  const { options } = parsedData;
  // you can extend the options like a normal JSON constiable:
  options.nodes = {
    color: 'red',
  };

  const container = document.getElementById('container');
  // create a network
  // eslint-disable-next-line no-unused-vars
  const network = new vis.Network(container, data, options);
}

// eslint-disable-next-line no-unused-vars
function addDot() {
  const codeDot = prompt('Cole o código DOT');
  runDot(codeDot);
}

const DOTstring = 'dinetwork {1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 1 }';
runDot(DOTstring);

global.addDot = addDot;
// provide data in the DOT language
