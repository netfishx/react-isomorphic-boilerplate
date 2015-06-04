import { Store } from 'flummox'
import { List } from 'immutable'

export default class UserStore extends Store {
    constructor(flux) {
        super()
        const actions = flux.getActionIds('users')
        this.register(actions.getUsers, this.handleUsers)
        this.register(actions.page, this.handlePage)

        this.state = {
            users: [],
            page: 1
        }
    }

    handleUsers(users) {
        this.setState({
            users: users,
            page: this.state.page
        })
    }

    handlePage(page) {
        this.setState({
            users: this.state.users,
            page: page
        })
    }

    getUsers() {
        return this.state.users
    }

    getPage(){
        return this.state.page
    }
}
