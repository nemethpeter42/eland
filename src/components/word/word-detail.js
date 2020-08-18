import React from 'react';
import ReactDOM from 'react-dom';
import SiteReferenceList from '../site-reference/site-reference.list';
import SimplePropertyList from '../simple-property-list/simple-property.list';

class WordDetail extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			item : {},
		}
	}
	
	componentDidMount(){
		fetch(
			`http://127.0.0.1:3000/word/${
				this.props.match.params.id
			}`
		).then(res => {
			//console.log(res)
			return res.json()
		})
		.then(json => {
			//console.log(json)
			this.setState({item:json})
		})
		
	}
	
	render (){
		return (
			<div className="multi-column-container">
				<div>
					<h1>{this.state.item.original}</h1>
					<p>{this.state.item.hungarian}</p>
					<div>
						<a href={this.state.item.prevId}>Előző</a> <a href={this.state.item.nextId}>Következő</a>
					</div>
					<div className='site-references-box'>
						<div className='site-references-box-title'>Webes szótárak</div>
						<SiteReferenceList siteReferences={this.state.item.generatedSiteReferences} />
					</div>
				</div>
				<div>
					<SimplePropertyList entry={this.state.item} />
				</div>
			</div>
			
		)
	};
}

export default WordDetail;