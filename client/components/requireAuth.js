import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import query from '../queries/CurrentUser';

export default(WrappedComponent) => {
    class requireAuth extends Component {
        componentDidUpdate() {
            if (!this.props.data.loading && !this.props.data.currentUser) {
                this.props.history.push("/login");
            }
        }

        componentDidMount() {
            if (!this.props.data.loading && !this.props.data.currentUser) {
                this.props.history.push("/login");
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(query)(requireAuth);
}
