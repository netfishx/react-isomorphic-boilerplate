import knex from 'knex'

const userDataSource = knex({
    client: 'mysql',
    connection: {
        host: '192.168.168.226',
        user: 'root',
        port: 33306,
        password: '780810',
        database: 'UserCenter'
    },
    pool: {
        min: 0,
        max: 10
    }
})

async function findUsers(page = 1) {
    console.log(page)
    return await userDataSource('Users').select('id').limit(10).offset((page - 1) * 10)
}

findUsers().then(users=>{

    console.log(users)
})
