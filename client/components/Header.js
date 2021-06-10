import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';


class Header extends Component {
    onLogout() {
        this.props.mutate({
            refetchQueries: [{query}]
        })
    }

    renderButtons() {
        const { loading, currentUser } = this.props.data;

        if (loading) {
            return (
                <div></div>
            );
        }

        if (currentUser) {
            return (<li><a onClick={this.onLogout.bind(this)}>Logout</a></li>);
        } else {
            return (
                <div>
                    <li><Link to="/signup">Create account</Link></li>
                    <li><Link to="/login">Log in</Link></li>
                </div>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default graphql(mutation)(
    graphql(query)(Header)
);