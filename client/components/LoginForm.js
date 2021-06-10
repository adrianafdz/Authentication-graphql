import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from '@apollo/client/react/hoc';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }
/*
    componentDidUpdate(prevProps) {
        if (!prevProps.data.currentUser && this.props.data.currentUser) { 
            this.props.history.push("/dashboard");
        }
    } */

    onSubmit({email, password}) {
        this.props.mutate({
            variables: {
                email,
                password,
            },
            refetchQueries: [{query}],
            awaitRefetchQueries: true
        })
        .then(() => this.props.history.push("/dashboard"))
        .catch(error => {
            const errors = error.graphQLErrors.map(e => e.message);
            this.setState({errors});
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Log in</h3>
                <AuthForm 
                    onSubmit={this.onSubmit.bind(this)} 
                    errors={this.state.errors}
                />
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);