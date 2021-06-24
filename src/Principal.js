import React from 'react'
import {Route,Switch,Link} from 'react-router-dom'
import {Tabs,Tab} from 'react-bootstrap'
import TabDBTables from './TabDBTables'
import TabDBPackages from './TabDBPackages'
import TabDBFunctions from './TabDBFunctions'
import TabDBProcedures from './TabDBProcedures'
import TabDBSequences from './TabDBSequences'
import TabModifications from './TabModifications'

function Principal() {
  return (
  		<div id='principal' className='animated fadeIn mx-2 my-2 py-2 px-2'>
				<div >
					<Tabs className='f-s-14' defaultActiveKey="tab-tables" id="tab-tables">
					  <Tab eventKey="tab-tables" title="Tables">
					    <div className='painel-graficos h-75'>
					    	<TabDBTables />
					    </div>
					  </Tab>
					  <Tab eventKey="tab-packages" title="Packages">
					    <div className='painel-graficos h-75'>
					    	<TabDBPackages />
					    </div>
					  </Tab>
					  <Tab eventKey="tab-functions" title="Functions">
					    <div className='painel-graficos h-75'>
					    	<TabDBFunctions />
					    </div>
					  </Tab>
					  <Tab eventKey="tab-procedures" title="Procedures">
					    <div className='painel-graficos h-75'>
					    	<TabDBProcedures />
					    </div>
					  </Tab>
					  <Tab eventKey="tab-sequences" title="Sequences">
					    <div className='painel-graficos h-75'>
					    	<TabDBSequences />
					    </div>
					  </Tab>
					  <Tab eventKey="tab-modifications" title="Modifications">
					    <div className='painel-graficos h-75'>
					    	<TabModifications />
					    </div>
					  </Tab>
					</Tabs>
				</div>	
  		</div>
  );
}

export default Principal;