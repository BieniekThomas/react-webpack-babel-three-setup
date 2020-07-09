import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	// Switch,
	// Route,
	// useLocation,
} from 'react-router-dom';
// import loadable from '@loadable/component';
import './index.scss';

const App = () => (
	<div>
		Hey there
	</div>
);

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('app'),
);
