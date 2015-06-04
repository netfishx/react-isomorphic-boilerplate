import React from 'react/addons';
import { RouteHandler,Link } from 'react-router';
const { CSSTransitionGroup } = React.addons;

class AppHandler extends React.Component {
    static willTransitionTo(transition) {
        const { path } = transition;

        if (path !== '/' && path.endsWith('/')) {
            transition.redirect(path.substring(0, path.length - 1));
        }
    }

    render() {
        return (
            <div>
                <Link to="users" params={{page: 1}}>1</Link>
                <Link to="users" params={{page: 2}}>2</Link>
                <Link to="users" params={{page: 3}}>3</Link>
                <Link to="users" params={{page: 4}}>4</Link>
                <Link to="users" params={{page: 5}}>5</Link>
                    <RouteHandler {...this.props} key={this.props.pathname}/>
            </div>
        );
    }
}

export default AppHandler;
