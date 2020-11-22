'use strict'

const calcular = () => {
  const matriz = [];
  let fc = document.getElementById("fc").value;
  let k = 0;
  let l = 0;
  for (let i = 0; i < fc; ++i) {
    matriz.push([]);
  }
  for (let i = 0; i < fc * fc; ++i) {
    matriz[l][k] = parseInt(document.getElementById(`input${i+1}`).value);
    k++;
    if (k == fc) {
      k = 0;
      l++;
    }
  }
  setTimeout(() => {
    for (let i = 0; i < fc; ++i) {
      for (let j = 0; j < fc; ++j) {
        console.log(matriz[i][j]);
      }
    }
    (reflexivo(matriz))
      ? console.log("La matriz SI es reflexiva")
      : console.log("La matriz NO es reflexiva");
    (irreflexivo(matriz))
      ? console.log("La matriz SI es irreflexiva")
      : console.log("La matriz NO es irreflexiva");
    (transitiva(matriz))
      ? console.log("La matriz SI es transitiva")
      : console.log("La matriz NO es transitiva");
    (simetrica(matriz))
      ? console.log("La matriz SI es simetrica")
      : console.log("La matriz NO es simetrica");
    (asimetrica(matriz))
      ? console.log("La matriz SI es asimetrica")
      : console.log("La matriz NO es asimetrica");
    (antisimetrica(matriz))
      ? console.log("La matriz SI es antisimetrica")
      : console.log("LA matriz NO es antisimetrica");
    console.log(matriz);
  }, 500)
}

const init = () => {
  if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
  var $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
    {
      initialContentAlignment: go.Spot.Center,  // center the content
      "undoManager.isEnabled": true  // enable undo & redo
    });

  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",  // the Shape will go around the TextBlock
      $(go.Shape, "RoundedRectangle",
        // Shape.fill is bound to Node.data.color
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 3 },  // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding("text", "key"))
    );
  // but use the default Link template, by not setting Diagram.linkTemplate
  // create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "Alpha", color: "lightblue" },
      { key: "Beta", color: "orange" },
      { key: "Gamma", color: "lightgreen" },
      { key: "Delta", color: "pink" }
    ],
    [
      { from: "Alpha", to: "Alpha" },
      { from: "Alpha", to: "Gamma" },
      { from: "Beta", to: "Beta" },
      { from: "Gamma", to: "Delta" },
      { from: "Delta", to: "Alpha" }
    ]);
}

// Create an assign a model that has a bunch of nodes with a bunch of random links between them.
const generateGraph = () => {
  const names = [];
  let fc = parseInt(document.getElementById("fc").value);
  for (let i = 0; i < fc; ++i) {
    names.push(i+1);
  }
  let nodeDataArray = [];
  for (let i = 0; i < names.length; i++) {
    nodeDataArray.push({ key: i, text: names[i], color: go.Brush.randomColor(128, 240) });
  }
  let linkDataArray = [];
  let num = nodeDataArray.length;
  for (let i = 0; i < num * 2; i++) {
    let a = Math.floor(i/2);
    let b = Math.floor(Math.random() * num / 4) + 1;
    linkDataArray.push({ from: a, to: (a + b) % num, color: go.Brush.randomColor(0, 127) });
  }
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

// Select two nodes at random for which there is a path that connects from the first one to the second one.
const chooseTwoNodes = () => {
  myDiagram.clearSelection();
  let num = myDiagram.model.nodeDataArray.length;
  let node1 = null;
  let node2 = null;
  for (let i = Math.floor(Math.random()*num); i < num*2; i++) {
    node1 = myDiagram.findNodeForKey(i%num);
    let distances = findDistances(node1);
    for (let j = Math.floor(Math.random()*num); j < num*2; j++) {
      node2 = myDiagram.findNodeForKey(j%num);
      let dist = distances.get(node2);
      if (dist > 1 && dist < Infinity) {
        node1.isSelected = true;
        node2.isSelected = true;
        break;
      }
    }
    if (myDiagram.selection.count > 0) break;
  }
}

// This event handler is declared in the node template and is called when a node's
// Node.isSelected property changes value.
// When a node is selected show distances from the first selected node.
// When a second node is selected, highlight the shortest path between two selected nodes.
// If a node is deselected, clear all highlights.
const nodeSelectionChanged = (node) => {
  let diagram = node.diagram;
  if (diagram === null) return;
  diagram.clearHighlighteds();
  if (node.isSelected) {
    // when there is a selection made, always clear out the list of all paths
    let sel = document.getElementById("myPaths");
    sel.innerHTML = "";
    // show the distance for each node from the selected node
    let begin = diagram.selection.first();
    showDistances(begin);
    if (diagram.selection.count === 2) {
      let end = node;  // just became selected
      // highlight the shortest path
      highlightShortestPath(begin, end);
      // list all paths
      listAllPaths(begin, end);
    }
  }
}

// Have each node show how far it is from the BEGIN node.
// This sets the "distance" property on each node.data.
const showDistances = (begin) => {
  // compute and remember the distance of each node from the BEGIN node
  distances = findDistances(begin);
  // show the distance on each node
  let it = distances.iterator;
  while (it.next()) {
    let n = it.key;
    let dist = it.value;
    myDiagram.model.setDataProperty(n.data, "distance", dist);
  }
}

// Highlight links along one of the shortest paths between the BEGIN and the END nodes.
// Assume links are directional.
const highlightShortestPath = (begin, end) => {
  highlightPath(findShortestPath(begin, end));
}

// A collection of all of the paths between a pair of nodes, a List of Lists of Nodes
let paths = null;
// List all paths from BEGIN to END
const listAllPaths = (begin, end) => {
  // compute and remember all paths from BEGIN to END: Lists of Nodes
  paths = collectAllPaths(begin, end);
  // update the Selection element with a bunch of Option elements, one per path
  let sel = document.getElementById("myPaths");
  sel.innerHTML = "";  // clear out any old Option elements
  paths.each((p) => {
    let opt = document.createElement("option");
    opt.text = pathToString(p);
    sel.add(opt, null);
  });
  sel.onchange = highlightSelectedPath;
}

// Return a string representation of a path for humans to read.
const pathToString = (path) => {
  let s = path.length + ": ";
  for (let i = 0; i < path.length; i++) {
    if (i > 0) s += " -- ";
    s += path.get(i).data.text;
  }
  return s;
}

// This is only used for listing all paths for the selection onchange event.
// When the selected item changes in the Selection element,
// highlight the corresponding path of nodes.
const highlightSelectedPath = () => {
  let sel = document.getElementById("myPaths");
  highlightPath(paths.get(sel.selectedIndex));
}

// Highlight a particular path, a List of Nodes.
const highlightPath = (path) => {
  myDiagram.clearHighlighteds();
  for (let i = 0; i < path.count - 1; i++) {
    let f = path.get(i);
    let t = path.get(i + 1);
    f.findLinksTo(t).each((l) => { l.isHighlighted = true; });
  }
}

// There are three bits of functionality here:
// 1: findDistances(Node) computes the distance of each Node from the given Node.
//    This function is used by showDistances to update the model data.
// 2: findShortestPath(Node, Node) finds a shortest path from one Node to another.
//    This uses findDistances.  This is used by highlightShortestPath.
// 3: collectAllPaths(Node, Node) produces a collection of all paths from one Node to another.
//    This is used by listAllPaths.  The result is remembered in a global letiable
//    which is used by highlightSelectedPath.  This does not depend on findDistances.
// Returns a Map of Nodes with distance values from the given source Node.
// Assumes all links are directional.
const findDistances = (source) => {
  let diagram = source.diagram;
  // keep track of distances from the source node
  let distances = new go.Map(/*go.Node, "number"*/);
  // all nodes start with distance Infinity
  let nit = diagram.nodes;
  while (nit.next()) {
    let n = nit.value;
    distances.set(n, Infinity);
  }
  // the source node starts with distance 0
  distances.set(source, 0);
  // keep track of nodes for which we have set a non-Infinity distance,
  // but which we have not yet finished examining
  let seen = new go.Set(/*go.Node*/);
  seen.add(source);
  // keep track of nodes we have finished examining;
  // this avoids unnecessary traversals and helps keep the SEEN collection small
  let finished = new go.Set(/*go.Node*/);
  while (seen.count > 0) {
    // look at the unfinished node with the shortest distance so far
    let least = leastNode(seen, distances);
    let leastdist = distances.get(least);
    // by the end of this loop we will have finished examining this LEAST node
    seen.delete(least);
    finished.add(least);
    // look at all Links connected with this node
    let it = least.findLinksOutOf();
    while (it.next()) {
      let link = it.value;
      let neighbor = link.getOtherNode(least);
      // skip nodes that we have finished
      if (finished.has(neighbor)) continue;
      let neighbordist = distances.get(neighbor);
      // assume "distance" along a link is unitary, but could be any non-negative number.
      let dist = leastdist + 1;  //Math.sqrt(least.location.distanceSquaredPoint(neighbor.location));
      if (dist < neighbordist) {
        // if haven't seen that node before, add it to the SEEN collection
        if (neighbordist === Infinity) {
          seen.add(neighbor);
        }
        // record the new best distance so far to that node
        distances.set(neighbor, dist);
      }
    }
  }

  return distances;
}

// This helper function finds a Node in the given collection that has the smallest distance.
const leastNode = (coll, distances) => {
  let bestdist = Infinity;
  let bestnode = null;
  let it = coll.iterator;
  while (it.next()) {
    let n = it.value;
    let dist = distances.get(n);
    if (dist < bestdist) {
      bestdist = dist;
      bestnode = n;
    }
  }
  return bestnode;
}

// Find a path that is shortest from the BEGIN node to the END node.
// (There might be more than one, and there might be none.)
const findShortestPath = (begin, end) => {
  // compute and remember the distance of each node from the BEGIN node
  distances = findDistances(begin);
  // now find a path from END to BEGIN, always choosing the adjacent Node with the lowest distance
  let path = new go.List();
  path.add(end);
  while (end !== null) {
    let next = leastNode(end.findNodesInto(), distances);
    if (next !== null) {
      if (distances.get(next) < distances.get(end)) {
        path.add(next);  // making progress towards the beginning
      } else {
        next = null;  // nothing better found -- stop looking
      }
    }
    end = next;
  }
  // reverse the list to start at the node closest to BEGIN that is on the path to END
  // NOTE: if there's no path from BEGIN to END, the first node won't be BEGIN!
  path.reverse();
  return path;
}

// Recursively walk the graph starting from the BEGIN node;
// when reaching the END node remember the list of nodes along the current path.
// Finally return the collection of paths, which may be empty.
// This assumes all links are directional.
const collectAllPaths = (begin, end) => {
  let stack = new go.List(/*go.Node*/);
  let coll = new go.List(/*go.List*/);
  const find = (source, end) => {
    source.findNodesOutOf().each((n) => {
      if (n === source) return;  // ignore reflexive links
      if (n === end) {  // success
        let path = stack.copy();
        path.add(end);  // finish the path at the end node
        coll.add(path);  // remember the whole path
      } else if (!stack.has(n)) {  // inefficient way to check having visited
        stack.add(n);  // remember that we've been here for this path (but not forever)
        find(n, end);
        stack.removeAt(stack.count - 1);
      }  // else might be a cycle
    });
  }
  stack.add(begin);  // start the path at the begin node
  find(begin, end);
  return coll;
}
