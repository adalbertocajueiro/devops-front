import React,{useState,useEffect} from 'react'
import context from './utils/Context'
import {Table,Form} from 'react-bootstrap'
import { MdEdit,MdDelete } from "react-icons/md";
import {Link} from 'react-router-dom'
var stringify = require('json-stringify');

function TabModifications() {
	const { state } = React.useContext(context);
	const [modifications,setModifications] = React.useState(state.modifications)
	const [selectedModification,setSelectedModification] = React.useState(undefined)
	
	useEffect(()=> {
		setModifications(state.modifications)
	},[state.modifications]);

	function formatNode(node){
		return 'Type: ' + node.modifiedNode.constructor.name + ' - Name: ' + node.modifiedNode.attributes.get('NAME')
	}
	function selectModification(modification){
		setSelectedModification(modification)
	}

	function objectToJson(node){
		var result = '';
		Object.entries(node).forEach(entry => 
				result = result.concat(entry[0]).concat(': ').concat(formatValue(entry[1])).concat('\n')
			)
		return result;
	}
	function formatValue(objectValue){
		var result = ''
		var className = objectValue.constructor.name
		if(className === 'Boolean'){
			result = objectValue.toString()
		} else if(className === 'Map'){
			result = '{'
			Array.from(objectValue.entries()).forEach( item =>
					result = result.concat(item[0]).concat(':"').concat(item[1]+'",')
				)
			result = result.concat('}')
		} else if(className === 'Array'){
			result = '{'
			objectValue.forEach(item => 
				result = result.concat(objectToJson(item)).concat(',')
				)
			result = result.concat('}')
		} else{
			result = objectValue.constructor.name
		}
		return result
	}
	
	return (
		<div className='animated fadeIn'>
			<div className='row f-s-13'>
				<div className='col scroll-y h-600'>
					<Table hover striped hover size="sm">
					<tbody>	{modifications.map( item => 
						<tr key={item.modifiedNode.attributes.get('NAME')} className='f-s-13'>
							<td>
								<div className='row'>
									<div className='col'><Link onClick={()=> selectModification(item)}>{formatNode(item)}</Link></div>
								</div>
							</td>
						</tr>
						)}				
						
					</tbody>
				</Table>
				</div>
				<div className='col'>
					<div className='row h-300 scroll-y'>
						<Form.Control className='f-s-12' key='textAreaOriginalNode' as='textArea'> 
							{selectedModification?objectToJson(selectedModification.originalNode):'Nada'}
						</Form.Control>
						
						
					</div>
					<div className='row h-300 scroll-y'>
						<Form.Control className='f-s-12' key='textAreaOriginalNode' as='textArea'> 
							{selectedModification?objectToJson(selectedModification.modifiedNode):'Nada'}
						</Form.Control>
													
						
					</div>
				</div>
			</div>
			
	  	</div>
	);
	

}


export default TabModifications;