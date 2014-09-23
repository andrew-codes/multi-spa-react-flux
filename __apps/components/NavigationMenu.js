/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Link = require('react-router').Link;

var NavigationMenu = React.createClass({
    propTypes: {
        links: ReactPropTypes.array.isRequired
    },
    getInitialState: getInitialState,
    componentDidMount: componentDidMount,
    render: render
});
module.exports = NavigationMenu;


function getInitialState() {
    return {};
}

function componentDidMount() {
}

function render() {
    return (
    <nav>
        <ul>
            {this.props.links
                .map(function(link){
                    return (
                        <li key={"id-" + link.href}>
                            <Link to={link.href}>{link.title}</Link>
                        </li>
                    );
            })}
        </ul>
    </nav>
    );
}
