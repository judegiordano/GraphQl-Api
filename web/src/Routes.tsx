import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Routes: React.FC = ():JSX.Element => {
	return (
		<BrowserRouter>
			<div>
				<header>
					<div>
						<Link to="/">home</Link>
						<br />
						<Link to="/register">register</Link>
						<br />
						<Link to="/login">login</Link>
					</div>
				</header>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/register" component={Register}/>
					<Route exact path="/login" component={Login}/>
				</Switch>
			</div>
		</BrowserRouter>
	)
}