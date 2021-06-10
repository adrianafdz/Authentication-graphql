import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from '@apollo/client/react/hoc';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: []}
    }

    /*
    componentDidUpdate(prevProps) {
        if (!prevProps.data.currentUser && this.props.data.currentUser) { 
            this.props.history.push("/dashboard");
        }
    } */

    onSubmit({password, email}) {
        this.props.mutate({
            variables: { email, password },
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
                <h3>Sign up</h3>
                <AuthForm onSubmit={this.onSubmit.bind(this)}
                errors={this.state.errors}/>
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);