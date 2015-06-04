import { Flummox } from 'flummox';
import UserActions from './actions/UserActions';
import UserStore from './stores/UserStore';

export default class Flux extends Flummox {
    constructor() {
        super();

        this.createActions('users', UserActions);
        this.createStore('users', UserStore, this);
    }
}
