import * as React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import NewBlog from './components/NewBlog';
import EditBlog from './components/EditBlog';
import BlogPost from './components/BlogPost';

export default class App extends React.Component {

	render() {
		return (
			<main className="container" id="background">
				<BrowserRouter>
					<section className="header" id="header">
						<div className="jumbotron jumbotron-fluid">
							<div className="container text-center">

								<h1 className="display-4 align-middle">Attack of the Blog</h1>

							</div>
							<br />
						</div>
						<Link className="link" to="/">Home</Link>
						<Link className="link" to="/newblog">New Post</Link>
					</section>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/newblog" component={NewBlog} />
						<Route exact path="/edit/:id" component={EditBlog}/>
						<Route exact path="/blogpost/:id" component={BlogPost} />
						<Redirect from="*" to="/"/>
					</Switch>
				</BrowserRouter>

			</main>
		);
	}
}


