import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// useLocation,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import routes from './router';
import useWindowSize from './util/hooks/useWindowSize';

import './index.scss';

const App = () => {
	const windowSize = useWindowSize();
	const Routes = routes.map( item => (
		<Route
			exact
			path={item.path}
			key={item.path}
		>
			<item.component windowSize={windowSize} />
		</Route>
	) );

	return (
		<>
			<ThemeProvider theme={theme}>
				<Switch>
					{Routes}
				</Switch>
			</ThemeProvider>
		</>
	);
};

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById( 'app' ),
);
