'use strict'
import bunyan from 'bunyan'
import swig from 'swig'
import express from 'express'
import knex from 'knex'
import logger from 'morgan'
import path from 'path'
import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
import routes from '../shared/routes';
import performRouteHandlerStaticMethod from '../shared/utils/performRouteHandlerStaticMethod';

const app = express()
const log = bunyan.createLogger({name: 'demo'})
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')
app.use(logger('combined'))
app.use('/static', express.static(path.join(__dirname, '../../public')));
const userDataSource = knex({
    client: 'mysql',
    connection: {

        database: 'UserCenter'
    },
    pool: {
        min: 0,
        max: 10
    }
})

const userRoutes = express.Router()
//
//userRoutes.get('/', async (req, res)=> {
//    const users = await findUsers()
//    res.render('index')
//})
userRoutes.get('/:page', async(req, res)=> {
    res.send(await findUsers(req.params.page))
})
async function findUsers(page = 1) {
    return await userDataSource('User').select('id', 'mobile').limit(10).offset((page - 1) * 10)
}

app.use('/api/users', userRoutes)

app.get('*', async (req, res)=> {
    const router = Router.create({
        routes: routes,
        location: req.url,
        onError: error => {
            throw error;
        },
        onAbort: abortReason => {
            const error = new Error();

            if (abortReason.constructor.name === 'Redirect') {
                const { to, params, query } = abortReason;
                error.redirect = router.makePath(to, params, query);
            }

            throw error;
        }
    });
    console.log(1)
    const flux = new Flux();

    let appString;

    try {
        const { Handler, state } = await new Promise((resolve, reject) => {
            router.run((_Handler, _state) =>
                    resolve({Handler: _Handler, state: _state})
            );
        });

        const routeHandlerInfo = {state, flux};

        await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);


        appString = React.renderToString(
            <FluxComponent flux={flux}>
                <Handler {...state} />
            </FluxComponent>
        );
    } catch (error) {
        console.log(11)
        if (error.redirect) {
            return this.redirect(error.redirect);
        }

        throw error;
    }


    res.render('index', {appString})
})

app.use(function (err, req, res, next) {
    log.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(3000)
log.info('listening on port 3000')
