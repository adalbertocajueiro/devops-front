import React,{useState,useEffect} from 'react'
import context from './utils/Context'
import {Table} from 'react-bootstrap'
import { MdEdit,MdDelete } from "react-icons/md"
import ModalEditColumn from './ModalEditColumn'
import {Link} from 'react-router-dom'
import {cloneColumnNode} from './utils/Functions'

function TabTableColumns(props) {
	const { state } = React.useContext(context);
	const [columns,setColumns] = useState([]);
	const [showEditColumn,setShowEditColumn] = useState(false);
	const [selectedColumn,setSelectedColumn] = useState(undefined);
	const [copySelectedColumn,setCopySelectedColumn] = useState(undefined);

	function toggleEditColumn(){
	  	setShowEditColumn(!showEditColumn);

	  	//colocar o originalNode(copySelectedTable) e o modified node na lista de modificacoes (no estado global)
	}
	
	function editColumn(item){
		setSelectedColumn(item)
		setCopySelectedColumn(cloneColumnNode(item))
		//console.log('Selected column: ', selectedColumn)
		toggleEditColumn();
	} 

	useEffect(()=> {
		if(!(typeof props.table === 'undefined')){
			//setTables(state.schema.ModifiableSchema.SchemaNode.Tables)
			setColumns(props.table.columns)
			//console.log('Primeira tabela, ', tables[0])
			if(typeof columns[0] !== 'undefined'){
				setSelectedColumn(columns[0])
				setCopySelectedColumn(cloneColumnNode(columns[0]))
			}
			//console.log("tables: ", state.xmlNode.schemaNode.tables)
		}
		
	},[props.table]);

	return (
		<div className='animated fadeIn'>
			<ModalEditColumn show={showEditColumn} handlerclose={toggleEditColumn} column={selectedColumn} columnCopy={copySelectedColumn}/>
			<div className='mx-1 bg-light scroll-y h-500'>
				<div className='row f-s-14 font-weight-bold bg-info'>
					<div className='col-2 font-weight-bold'>NAME</div>
					<div className='col-1 font-weight-bold'>TYPE</div>
					<div className='col-1 font-weight-bold'>LENGTH</div>
					<div className='col-1 font-weight-bold'>NULLABLE</div>
					<div className='col'>COMMENTS</div>
				</div>
				<Table hover striped hover size="sm">
					<tbody>			
						{columns? columns.map( item => 
						<tr key={item.attributes.get('NAME')} className='f-s-13'>
							<td>
								<div className={item.modified?'row text-modified':'row'}>
									<div className='col-2 font-weight-bold'>{item.attributes.get('NAME')}</div>
									<div className='col-1 font-weight-bold'>{item.attributes.get('TYPE')}</div>
									<div className='col-1 font-weight-bold'>{item.attributes.get('LENGHT')}</div>
									<div className='col-1 font-weight-bold'>{item.attributes.get('NULLABLE')}</div>
									<div className='col-6'>{item.attributes.get('COMMENTS')}</div>
									<div className='col'>
										<Link onClick={()=> editColumn(item)}><MdEdit /> </Link> 
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


export default TabTableColumns;