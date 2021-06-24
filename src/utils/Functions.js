import {TableNode,ColumnNode,ConstraintNode, IndexNode} from './Model'

export function cloneTableNode(node){
  var result = new TableNode();
  result.attributes = new Map();
  Array.from(node.attributes.entries()).forEach( item => 
      result.attributes.set(item[0],item[1])
    );
  //clonar os filhos
  result.columns = new Array();
  node.columns.forEach(column => 
    result.columns.push(cloneColumnNode(column))
    );
  result.constraints = new Array();
  node.constraints.forEach(constraint => 
    result.constraints.push(cloneConstraintNode(constraint))
    );
  result.indexes = new Array();
  node.indexes.forEach(item => 
    result.indexes.push(cloneIndexNode(item))
    );
  return result;
}
export function cloneColumnNode(node){
  var result = new ColumnNode();
  result.attributes = new Map();
  Array.from(node.attributes.entries()).forEach( item => 
      result.attributes.set(item[0],item[1])
    );
  return result;
}
export function cloneConstraintNode(node){
  var result = new ConstraintNode();
  result.attributes = new Map();
  Array.from(node.attributes.entries()).forEach( item => 
      result.attributes.set(item[0],item[1])
    );
  return result;
}
export function cloneIndexNode(node){
  var result = new IndexNode();
  result.attributes = new Map();
  Array.from(node.attributes.entries()).forEach( item => 
      result.attributes.set(item[0],item[1])
    );
  return result;
}