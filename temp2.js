'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
require('babel/polyfill')
var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var userDataSource = _knex2['default']({
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
});

function findUsers() {
    var page = arguments[0] === undefined ? 1 : arguments[0];
    return regeneratorRuntime.async(function findUsers$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                console.log(page);
                context$1$0.next = 3;
                return userDataSource('User').select('id').limit(10).offset((page - 1) * 10);

            case 3:
                return context$1$0.abrupt('return', context$1$0.sent);

            case 4:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
}

findUsers().then(function(err,users){
    console.log(err)
    console.log(users)
})

