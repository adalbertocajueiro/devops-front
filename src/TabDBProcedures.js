import React,{useState,useEffect} from 'react'
import context from './utils/Context'
import {Table} from 'react-bootstrap'
import { MdEdit,MdDelete } from "react-icons/md";


function TabDBProcedures() {
	const { state } = React.useContext(context);
	const [procedures,setProcedures] = useState([]);

	useEffect(()=> {
		if(!(typeof state.schema === 'undefined')){
			setProcedures(state.schema.ModifiableSchema.SchemaNode.Procedures)
		}
		
	},[state.schema]);

	return (
		<div className='animated fadeIn'>
			<div className='f-s-14 font-weight-bold'>Total of procedures: {procedures.length}</div>
			<div className='mx-1 bg-light scroll-y h-600'>
				<div className='row f-s-14 font-weight-bold bg-info'>
					<div className='col-4 font-weight-bold'>NAME</div>
					<div className='col'>STATUS</div>
				</div>
				<Table hover striped hover size="sm">
					<tbody>	{procedures? procedures.map( item => 
						<tr key={item.Attributes.NAME} className='f-s-13'>
							<td>
								<div className='row'>
									<div className='col-4'>{item.Attributes.NAME}</div>
									<div className='col-7'>{item.Attributes.STATUS}</div>
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


export default TabDBProcedures;