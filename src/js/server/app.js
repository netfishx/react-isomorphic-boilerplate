'use strict';

var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "demo"});
var koa = require('koa');
var route = require('koa-router')();
var parse = require('co-body');

var app = koa();

app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = {
            result: false,
            msg: err.message
        };
        this.app.emit('error', err, this);
    }
});


route.get('/check', function*() {
    this.body = yield render();
});

app.use(route.routes())
    .use(route.allowedMethods());

app.on('error', function (err) {
    log.error('found a error %s', err.message);
    log.error(err);
});
app.listen(3333);
log.info('listening on port 3333');
