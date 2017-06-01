import React from 'react';
import ReactDOM from 'react-dom';

import Detail from './pages/Detail.js';
import './css/styles.css';

ReactDOM.render(
	<Detail message="This is coming from props"/>, 
	document.getElementById('app')
	); 