import React, {useEffect } from 'react'
import {Modal,Button,Form,Tabs,Tab} from 'react-bootstrap'
import {TableNode,ColumnNode,Modification} from './utils/Model'
import { MdSave } from  'react-icons/md'
import {Link} from 'react-router-dom'
import context from './utils/Context'
import {cloneTableNode,cloneColumnNode} from './utils/Functions'
import TabTableColumns from './TabTableColumns'


function ModalEditTable(props) {
	const { state, addModification } = React.useContext(context);
	//const[tableCopy,setTableCopy] = React.useState(undefined)
	const modifiedColor = 'blue'
	const normalColor = 'black'

	//useEffect(()=> {
	//	if(!(typeof props.table === 'undefined')){
	//		setTableCopy(cloneTableNode(props.table))
	//	}		
	//},[props.table]);

	function focusOut(componentId){
		//se perdeu o foco e o texto mudou entao já salva, pinta o texto diferente e marca com modificado
		var value = document.getElementById(componentId).value
		
		if(props.tableCopy.attributes.get(componentId) !== value){
			props.table.attributes.set(componentId,document.getElementById(componentId).value)
			props.table.modified = true
			//console.log("Modificou campo ", props.table.modified )
			document.getElementById(componentId).style.color = modifiedColor
		}
	}
	
	function update(){
		var modified = false;

		var modification = new Modification()
		modification.originalNode = props.tableCopy
		modification.modifiedNode = props.table
		addModification(modification)

		props.handlerclose();
	}


	return(
		<div className='animated fadeIn'>
			<Modal
		      show={props.show}
		      size="xl"
		      aria-labelledby="contained-modal-title-vcenter"
		      centered
		      onHide={props.handlerclose}
		    >
		      
		      <Modal.Body >
		        
		        <div className='ml-1 d-flex flex-column f-s-1 h-600'>
		        		
	  					{props.table?Array.from(props.table.attributes.entries()).map(item => 
							<div className='row text-left pl-0 d-flex f-s-12'>
	  							<div className='col-1'>{item[0]}: </div>
	  							<div className='col'>
	  								<Form.Control id={item[0]} plaintext placeholder="Normal text" defaultValue={item[1]} onBlur={() => focusOut(item[0])} />
	  							</div>	
	  						</div>
	  						):''}

	  					<div className="row">
	  						<Tabs className='f-s-14' defaultActiveKey="tab-table-columns" id="tab-table-details">
	  							<Tab eventKey="tab-table-columns" className='f-s-12' title="Columns">
								    <div className='scoll-y h-500'>
								    	<TabTableColumns table={props.table}/>
								    </div>
								  </Tab>
	  						</Tabs>
	  					</div>
		        </div>
		      </Modal.Body>
		      <Modal.Footer>
		        <Button size='sm' className='shadow-none' onClick={() => update()}>Fechar</Button>	
		      </Modal.Footer>
		    </Modal>
		</div>

	);
}
export default ModalEditTable;