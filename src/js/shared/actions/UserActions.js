import { Actions } from 'flummox'
import request from 'superagent'
export default class UserActions extends Actions {
    async getUsers(page = 1) {
        try {
            return await new Promise((resolve, reject)=> {
                request.get(`/api/users/${page}`)
                    .end((err, res)=> {
                        err ? reject(err) : resolve(res.body)
                    })
            })
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    page(page) {
        return page
    }

}
