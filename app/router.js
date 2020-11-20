import loadable from '@loadable/component';

const Home = loadable( () => import( /* webpackChunkName: "home" */ './pages/home' ) );

export default [
	{
		path: '/',
		navigationName: 'Home',
		component: Home,
	},
];
