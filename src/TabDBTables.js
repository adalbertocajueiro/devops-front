import React,{useState,useEffect} from 'react'
import context from './utils/Context'
import {Table} from 'react-bootstrap'
import { MdEdit,MdDelete } from "react-icons/md"
import ModalEditTable from './ModalEditTable'
import {Link} from 'react-router-dom'
import {cloneTableNode} from './utils/Functions'

function TabDBTables() {
	const { state } = React.useContext(context);
	const [tables,setTables] = useState([]);
	const [showEditTable,setShowEditTable] = useState(false);
	const [selectedTable,setSelectedTable] = useState(undefined);
	const [copySelectedTable,setCopySelectedTable] = useState(undefined);

	function toggleEditTable(){
	  	setShowEditTable(!showEditTable);

	  	//colocar o originalNode(copySelectedTable) e o modified node na lista de modificacoes (no estado global)
	}
	
	function editTable(item){
		setSelectedTable(item)
		setCopySelectedTable(cloneTableNode(item))
		toggleEditTable();
	} 

	useEffect(()=> {
		if(!(typeof state.xmlNode === 'undefined')){
			//setTables(state.schema.ModifiableSchema.SchemaNode.Tables)
			setTables(state.xmlNode.schemaNode.tables)
			//console.log('Primeira tabela, ', tables[0])
			if(typeof tables[0] !== 'undefined'){
				setSelectedTable(tables[0])
				setCopySelectedTable(cloneTableNode(tables[0]))
			}
			//console.log("tables: ", state.xmlNode.schemaNode.tables)
		}
		
	},[state.xmlNode,tables]);

	return (
		<div className='animated fadeIn'>
			<div className='f-s-14 font-weight-bold'>Total of tables: {tables.length}</div>
			<ModalEditTable show={showEditTable} handlerclose={toggleEditTable} table={selectedTable} tableCopy={copySelectedTable}/>
			<div className='mx-1 bg-light scroll-y h-600'>
				<div className='row f-s-14 font-weight-bold bg-info'>
					<div className='col-4 font-weight-bold'>NAME</div>
					<div className='col'>COMMENTS</div>
				</div>
				<Table hover striped hover size="sm">
					<tbody>	{tables? tables.map( item => 
						<tr key={item.attributes.get('NAME')} className='f-s-13'>
							<td>
								<div className={item.modified?'row text-modified':'row'}>
									<div className='col-4'>{item.attributes.get('NAME')}</div>
									<div className='col-7'>{item.attributes.get('COMMENTS')}</div>
									<div className='col'>
										<Link onClick={()=> editTable(item)}><MdEdit /> </Link> 
										<MdDelete />
									</div>
								</div>
							</td>
						</tr>
						): ""}				
						
					</tbody>
				</Table>
			</div>
			
	  	</div>
	);
	

}


export default TabDBTables;