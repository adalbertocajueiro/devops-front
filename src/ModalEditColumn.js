import React, {useEffect } from 'react'
import {Modal,Button,Form,Tabs,Tab} from 'react-bootstrap'
import {TableNode,ColumnNode} from './utils/Model'
import { MdSave } from  'react-icons/md'
import {Link} from 'react-router-dom'
import context from './utils/Context'
import {cloneColumnNode} from './utils/Functions'


function ModalEditColumn(props) {
	const { state } = React.useContext(context);
	//const[tableCopy,setTableCopy] = React.useState(undefined)
	const modifiedColor = 'blue'
	const normalColor = 'black'


	function focusOut(componentId){
		//se perdeu o foco e o texto mudou entao já salva, pinta o texto diferente e marca com modificado
		var element = document.getElementById('column-'+componentId)
		var value = element.value
		//console.log('Original value: ', props.columnCopy.attributes.get(componentId))
		//console.log('Edited value ', value)
		if(props.columnCopy.attributes.get(componentId) !== value){
			props.column.attributes.set(componentId,value)
			props.column.modified = true
			props.column.parent.modified = true
			//console.log("Modificou campo ", props.table.modified )
			document.getElementById('column-'+componentId).style.color = modifiedColor
		}
	}
	

	return(
		<div className='animated fadeIn'>
			<Modal
		      show={props.show}
		      size="lg"
		      aria-labelledby="contained-modal-title-vcenter"
		      centered
		      onHide={props.handlerclose}
		    >
		      
		      <Modal.Body >
		        
		        <div className='ml-1 d-flex flex-column f-s-1'>
		        		
	  					{props.column?Array.from(props.column.attributes.entries()).map(item => 
							<div className='row text-left f-s-12'>
	  							<div className='col-1 mx-1 pt-2 px-1'>{item[0]}: </div>
	  							<div className='col mx-1 pb-2 pl-2'>
	  								<Form.Control id={'column-'+item[0]} plaintext placeholder="Normal text" defaultValue={item[1]} onBlur={() => focusOut(item[0])} />
	  							</div>	
	  						</div>
	  						):''}

		        </div>
		      </Modal.Body>
		      <Modal.Footer>
		        <Button size='sm' className='shadow-none' onClick={() => props.handlerclose()}>Fechar</Button>
		      </Modal.Footer>
		    </Modal>
		</div>

	);
}
export default ModalEditColumn;