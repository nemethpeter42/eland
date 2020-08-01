/*import { run } from "./app/app";
import "./main.scss";
import { AlertService } from "./app/alert.service";
import { ComponentService } from "./app/component.service";
const alertService = new AlertService();
const componentService = new ComponentService();
run(alertService, componentService);
console.log("J");
*/
import "./main.scss";
import {Summary} from './components/summary'
import WordDetail from './components/word/word-detail'
import React from 'react';
import ReactDOM from 'react-dom';
const title = 'React with Webpack and Babel';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
ReactDOM.render(
  
  <Router>
	<div className='App'>
	{/*<Nav /> navigáláshoz import {Link} from 'react-router-dom';*/}
		<Switch>
			<Route path='/' exact component={Summary}/>
			{/*<Route path='/about' component={About}/>*/}
			<Route path='/word/:id' component={WordDetail}/>
		</Switch>
	</div>
  </Router>
  ,
  document.getElementById('app')
);