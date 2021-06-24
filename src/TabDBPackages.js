import React,{useState,useEffect} from 'react'
import context from './utils/Context'
import {Table} from 'react-bootstrap'
import { MdEdit,MdDelete } from "react-icons/md";


function TabDBPackages() {
	const { state } = React.useContext(context);
	const [packages,setPackages] = useState([]);

	useEffect(()=> {
		if(!(typeof state.schema === 'undefined')){
			setPackages(state.schema.ModifiableSchema.SchemaNode.Packages)
			//console.log("esquema: ", state.schema.ModifiableSchema.SchemaNode.Packages)
		}
		
	},[state.schema]);

	return (
		<div className='animated fadeIn'>
			<div className='f-s-14 font-weight-bold'>Total of packages: {packages.length}</div>
			<div className='mx-1 bg-light scroll-y h-600'>
				<div className='row f-s-14 font-weight-bold bg-info'>
					<div className='col-5 font-weight-bold'>NAME</div>
					<div className='col-3 font-weight-bold'>HAS_BODY</div>
					<div className='col'>STATUS</div>
				</div>
				<Table hover striped hover size="sm">
					<tbody>	{packages? packages.map( item => 
						<tr key={item.Attributes.NAME}  className='f-s-13'>
							<td>
								<div className='row'>
									<div className='col-5'>{item.Attributes.NAME}</div>
									<div className='col-3'>{item.Attributes.HAS_BODY}</div>
									<div className='col-3'>{item.Attributes.STATUS}</div>
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


export default TabDBPackages;