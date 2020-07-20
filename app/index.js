import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// useLocation,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import loadable from '@loadable/component';
import './index.scss';
import theme from './theme/theme';

const Homepage = loadable( () => import( /* webpackChunkName: "home" */ './pages/home' ) );

const App = () => (
	<ThemeProvider theme={theme}>
		<Switch>
			<Route exact path="/" component={Homepage} />
		</Switch>
	</ThemeProvider>
);

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById( 'app' ),
);
