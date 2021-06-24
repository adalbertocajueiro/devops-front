import React,{useEffect} from 'react';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import context from './utils/Context'
import axios from "axios";
import Principal from "./Principal"
import {BACK_END_URL,SCHEMA_ROUTE} from './utils/Constants';
import {XmlNode,SchemaNode,TableNode,ColumnNode,ConstraintNode,IndexNode,ViewNode,FunctionNode, ArgumentNode, ProcedureNode,PackageNode,MethodNode} from './utils/Model';

function App() {
  const { Provider } = context;

  const [state, setState] = React.useState({
    schema:undefined,
    xmlNode: undefined,
    modifications:[]
  });

  const addModification = newModif => {
    setState({ ...state, modifications:state.modifications.concat([newModif]) });
  };

  const SCHEMA_URL = `${BACK_END_URL}/${SCHEMA_ROUTE}`;

  useEffect(() => {
    const fetchData = async () => {
      const resultSchema = await axios.get('https://localhost:22523/schema');
      setState({ ...state,  schema:resultSchema.data, xmlNode:buildXmlNode(resultSchema.data) });
      //console.log('Buscou o esquema',resultSchema.data)
      
    };
    fetchData();
  
  },[] );

  function buildXmlNode(dbSchemaJson){
    if(! (typeof dbSchemaJson === 'undefined')){
      var schemaNode = dbSchemaJson.ModifiableSchema
      var xmlNode = new XmlNode(undefined,undefined,undefined)
      xmlNode.attributes = new Map();
      xmlNode.schemaNode = buildSchemaNode(dbSchemaJson.ModifiableSchema.SchemaNode);
      //Object.entries(schemaNode.Attributes).forEach( (k,v) => xmlNode.attributes.set(k,v));
      //Object.keys(schemaNode.Attributes).forEach( item => xmlNode.attributes.set(item[0],item[1]));
      xmlNode.schemaNode.parent = xmlNode;
      console.log('XmlNode: ', xmlNode);

    }
    return xmlNode;
     
  }
  function buildSchemaNode(schemaNode){
    var schema = new SchemaNode(undefined,undefined,undefined)
    schema.attributes = new Map();
    Object.entries(schemaNode.Attributes).forEach( item => schema.attributes.set(item[0],item[1]));
    schema.tables = buildTables(schema, schemaNode.Tables);
    schema.views = buildViews(schema, schemaNode.Views);
    schema.functions = buildFunctions(schema, schemaNode.Functions);
    schema.procedures = buildProcedures(schema, schemaNode.Procedures);
    schema.packages = buildPackages(schema, schemaNode.Packages);
    //Object.entries(schemaNode.Tables).forEach( (k,v) => schema.attributes.set(k,v));
    return schema;
  }

  function buildTables(parentNode, tables){
    var array = new Array();
    tables.forEach( table => array.push( buildTable(parentNode, table)));
    return array;
  }
  function buildTable(parentNode, table){
    var result = new TableNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(table.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    result.columns = buildColumns(result, table.Columns);
    result.constraints = buildConstraints(result, table.Constraints);
    result.indexes = buildIndexes(result, table.Indexes);
    return result;
  }
  function buildViews(parentNode, views){
    var array = new Array();
    views.forEach( view => array.push( buildView(parentNode,  view)));
    return array;
  }
  function buildView(parentNode, view){
    var result = new ViewNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(view.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    result.columns = buildColumns(result, view.Columns);
    return result;
  }
  function buildColumns(parentNode, columns){
    var array = new Array();
    columns.forEach( column => array.push( buildColumn(parentNode, column)));
    return array;
  }
  function buildColumn(parentNode, column){
    var result = new ColumnNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(column.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    return result;
  }
  function buildConstraints(parentNode, constraints){
    var array = new Array();
    constraints.forEach( constraint => array.push( buildConstraint(parentNode, constraint)));
    return array;
  }
  function buildConstraint(parentNode, constraint){
    var result = new ConstraintNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(constraint.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    return result;
  }
  function buildIndexes(parentNode, indexes){
    var array = new Array();
    indexes.forEach( index => array.push( buildIndex(parentNode, index)));
    return array;
  }
  function buildIndex(parentNode, index){
    var result = new IndexNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(index.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    return result;
  }
  function buildFunctions(parentNode, functions){
    var array = new Array();
    functions.forEach( func => array.push( buildFunction(parentNode, func)));
    return array;
  }
  function buildFunction(parentNode, func){
    var result = new  FunctionNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(func.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    result.arguments = buildArguments(result, func.Arguments);
    return result;
  }
  function buildProcedures(parentNode, procedures){
    var array = new Array();
    procedures.forEach( procedure => array.push( buildProcedure(parentNode, procedure)));
    return array;
  }
  function buildProcedure(parentNode, procedure){
    var result = new  ProcedureNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(procedure.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    result.arguments = buildMethods(result, procedure.Arguments);
    return result;
  }

  function buildPackages(parentNode,  packs){
    var array = new Array();
    packs.forEach( pack => array.push( buildPackage(parentNode, pack)));
    return array;
  }
  function buildPackage(parentNode, pack){
    var result = new  PackageNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(pack.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    //console.log('Package ', pack)
    result.methods = buildMethods(result, pack.Methods);
    return result;
  }
  function buildMethods(parentNode, methods){
    var array = new Array();
    methods.forEach( method => array.push( buildMethod(parentNode, method)));
    
    return array;
  }
  function buildMethod(parentNode, method){
    var result = new MethodNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(method.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    //console.log('Method: ', method)
    result.arguments = buildArguments(result, method.Arguments);
    return result;
  }
  function buildArguments(parentNode, args){
    var array = new Array();
    //console.log('Args: ', args)
    if( !(typeof args === 'undefined')){
      args.forEach( argument => array.push( buildArgument(parentNode, argument)));
    }
    return array;
  }
  function buildArgument(parentNode, argument){
    var result = new ArgumentNode();
    result.parent = parentNode;
    result.attributes = new Map();
    Object.entries(argument.Attributes).forEach( item => result.attributes.set(item[0],item[1]));
    return result;
  }

  return (
    <Provider
      value={{
        state,
        addModification
      }}
    >
      <BrowserRouter>
        <Principal />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
