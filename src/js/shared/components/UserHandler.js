import React from 'react';
import Flux from 'flummox/component';
import User from './User';
class UserHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let userActions = flux.getActions('users');
        return await userActions.getUsers(state.params.page);
    }

    //async handleNewTask(text) {
    //    let actions = this.props.flux.getActions('todo');
    //    await actions.createTask({text});
    //}

    render() {
        return (
                <Flux connectToStores={['users']}>
                    <User />
                </Flux>
        );
    }
}

export default UserHandler;
