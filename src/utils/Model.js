class DBModelNode {
  attributes;
  parent;
  modified = false;
}

class AbstractModelNode extends DBModelNode {
  

}

export class XmlNode extends AbstractModelNode {
  schemaNode;
}

export class SchemaNode extends AbstractModelNode{
  tables;
  views;
  functions;
  procedures;
  packages;
  indexes;
  triggers;
  sequences;
}

export function setModified(node){
  node.modified = true;
  if(node.parent !== undefined){
    setModified(node.parent);
  }
}

export class TableNode extends AbstractModelNode{
  columns;
  constraints;
  indexes;
}
export class ViewNode extends AbstractModelNode{
  columns;
}
export class FunctionNode extends AbstractModelNode{
  arguments;
}
export class ProcedureNode extends AbstractModelNode{
  arguments;
}
export class PackageNode extends AbstractModelNode{
  methods;
}

export class MethodNode extends AbstractModelNode{
  arguments;
}
export class ColumnNode extends AbstractModelNode{

}

export class ConstraintNode extends AbstractModelNode{

}

export class IndexNode extends AbstractModelNode{

}
export class ArgumentNode extends AbstractModelNode{

}

export class Modification{
  originalNode;
  modifiedNode;
}