/**
 * @jsx React.DOM
 */

var React = require('react');
var NavigationMenu = require('./NavigationMenu');
var App = React.createClass({
    getInitialState: getInitialState,
    componentDidMount: componentDidMount,
    componentWillUnmount: componentWillUnmount,
    render: render
});
module.exports = App;

function getInitialState() {
    return {
        mainNavigationLinks: []
    };
}

function componentDidMount() {
    if (this.isMounted()) {
        this.setState({
            mainNavigationLinks: [
                {
                    href: '/',
                    title: 'Home'
                },
                {
                    href: '/backlog',
                    title: 'Backlog'
                }
            ]
        });
    }
}

function componentWillUnmount() {
}

function render() {
    return (
        <div>
        <NavigationMenu key={'id'} links={this.state.mainNavigationLinks} />
        <this.props.activeRouteHandler />
        </div>
    );
}
