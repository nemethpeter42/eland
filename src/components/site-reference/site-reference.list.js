import React from 'react';
import ReactDOM from 'react-dom';

class SiteReferenceList extends React.Component{
	
	constructor(props){
		super(props)
		console.log(props)
		this.state = {
			siteReferences : {},
		}
	}
	
	
	
	
	render (){
		
		const listPages = (arr) => {
			return arr.map((e,i) => (
				<div className='page-box' key={i}>
					<a className='page' href={e.url} target='_blank'>{e.title}</a>
				</div>
			))
		}
		
		const listPageGroups = (arr) => {
			return arr.map((e,i) => (
				<div className='page-group-box' key={i}>
					<a className='page-group-main-page' href={e.groupMainPage} target='_blank'>{e.title}</a>
					{listPages(e.pages)}
				</div>
			))
		}
		
		const listSites =(arr) =>
		{
			return arr.map((e,i) => (
				<div className='site-box' key={i}>
					<a className='site-main-page' href={e.siteMainPage} target='_blank'>{e.siteName}</a>
					{listPageGroups(e.pageGroups)}
				</div>
			))
		}
		
		const listLanguages = (obj) => 
		{
			return obj!==undefined ? (Object.keys(obj).map(e => {
				console.log('REFRESH')
				console.log(e)
				return (<div className='language-box' key={e}>
					<div className='language'>
						{e}
					</div>
					{listSites(obj[e])}
				</div>)
			})):undefined
		}
		return (
			<div className="site-reference-list">
				{listLanguages(this.props.siteReferences)}
			</div>
		)
	};
}


export default SiteReferenceList;