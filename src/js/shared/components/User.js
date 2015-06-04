import React from 'react';

class User extends React.Component {

    render() {
        const {users} = this.props
        return (
            <table className="users">
                <thead>
                <tr>
                    <th>id</th>
                    <th>mobile</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.mobile}</td>
                        </tr>
                )}
                </tbody>
            </table>
        );
    }
}

export default User;
