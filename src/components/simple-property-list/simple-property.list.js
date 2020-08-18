import React from 'react';
import ReactDOM from 'react-dom';

class SimplePropertyList extends React.Component{
	
	constructor(props){
		super(props)
		console.log(props)
		this.state = {
			entry : {},
		}
	}
	
	
	
	
	render (){
		
		const listPropertiesOfEntry = (obj) => 
		{
			return obj!==undefined ? (Object.keys(obj).filter(e => 'object' !== typeof obj[e]).map(e => {
				//console.log('REFRESH')
				//console.log(e)
				return (<div className='property-box' key={e}>
					<div className='property-key'>
						{e}
					</div>
					<div className='property-value'>
						{obj[e].toString()}
					</div>
				</div>)
			})):undefined
		}
		return (
			<div className="properties-of-entry--list">
				{listPropertiesOfEntry(this.props.entry)}
			</div>
		)
	};
}


export default SimplePropertyList;