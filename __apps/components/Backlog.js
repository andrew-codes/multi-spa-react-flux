/**
 * @jsx React.DOM
 */

var React = require('react');

var Backlog = React.createClass({
    getInitialState: getInitialState,
    componentDidMount: componentDidMount,
    componentWillUnmount: componentWillUnmount,
    render: render
});
module.exports = Backlog;

function getInitialState() {
    return {};
}

function componentDidMount() {
}

function componentWillUnmount() {
}

function render() {
    return (
        <div><h1>Hello World</h1>
        <this.props.activeRouteHandler/>
        </div>
    );
}
