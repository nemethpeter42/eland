import React from 'react';
import ReactDOM from 'react-dom';

class SimplePropertyList extends React.Component{
	
	constructor(props){
		super(props)
		console.log(props)
		this.state = {
			propertiesOfEntry : {},
		}
	}
	
	
	
	
	render (){
		
		const listPropertiesOfEntry = (obj) => 
		{
			return obj!==undefined ? (Object.keys(obj).map(e => {
				//console.log('REFRESH')
				//console.log(e)
				return (<div className='property-box' key={e}>
					<div className='property-key'>
						{e.key}
					</div>
					<div className='property-value'>
						{e.value}
					</div>
				</div>)
			})):undefined
		}
		return (
			<div className="properties-of-entry--list">
				{listPropertiesOfEntry(this.props.propertiesOfEntry)}
			</div>
		)
	};
}


export default SiteReferenceList;