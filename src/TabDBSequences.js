import React,{useState,useEffect} from 'react'
import context from './utils/Context'
import {Table} from 'react-bootstrap'
import { MdEdit,MdDelete } from "react-icons/md";


function TabDBSequences() {
	const { state } = React.useContext(context);
	const [sequences,setSequences] = useState([]);

	useEffect(()=> {
		if(!(typeof state.schema === 'undefined')){
			setSequences(state.schema.ModifiableSchema.SchemaNode.Sequences)
			//console.log("esquema: ", state.schema.ModifiableSchema.SchemaNode.Sequences)
		}
		
	},[state.schema]);

	return (
		<div className='animated fadeIn'>
			<div className='f-s-14 font-weight-bold'>Total of sequences: {sequences.length}</div>
			<div className='mx-1 bg-light scroll-y h-600'>
				<div className='row f-s-14 font-weight-bold bg-info'>
					<div className='col-5 font-weight-bold'>NAME</div>
					<div className='col-3 font-weight-bold'>INCREMENT_BY</div>
					<div className='col'>CACHE_SIZE</div>
				</div>
				<Table hover striped hover size="sm">
					<tbody>	{sequences? sequences.map( item => 
						<tr key={item.Attributes.NAME} className='f-s-13'>
							<td>
								<div className='row'>
									<div className='col-5'>{item.Attributes.NAME}</div>
									<div className='col-3'>{item.Attributes.INCREMENT_BY}</div>
									<div className='col-3'>{item.Attributes.CACHE_SIZE}</div>
									<div className='col'><MdEdit /> <MdDelete /></div>
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


export default TabDBSequences;