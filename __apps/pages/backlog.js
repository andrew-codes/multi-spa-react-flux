/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var App = require('./../components/Backlog');
React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={App}></Route>
    <NotFoundRoute handler={App}/>
  </Routes>
), document.body);
