import React, { Component } from 'react';
import AuthForm from './AuthForm';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            error: []
        }
    }

    componentWillUpdate(nextProps){
        if(!this.props.data.user && nextProps.data.user){
            hashHistory.push("/dashboard");
        }
    }

    onSubmit({email, password}){
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{query}]
        }).catch(err => {
            const error = err.graphQLErrors.map(error => error.message);
            this.setState({ error })
        });
    }

    render(){
        return(
            <div>
                <h3>Sign Up</h3>
                <AuthForm 
                  errors={this.state.error}
                  onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(query)(
graphql(mutation)(SignupForm)
);