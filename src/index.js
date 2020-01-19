/*import { run } from "./app/app";
import "./main.scss";
import { AlertService } from "./app/alert.service";
import { ComponentService } from "./app/component.service";
const alertService = new AlertService();
const componentService = new ComponentService();
run(alertService, componentService);
console.log("J");
*/

import {Summary} from './components/summary'
import React from 'react';
import ReactDOM from 'react-dom';
const title = 'React with Webpack and Babel';
ReactDOM.render(
  <Summary />,
  document.getElementById('app')
);