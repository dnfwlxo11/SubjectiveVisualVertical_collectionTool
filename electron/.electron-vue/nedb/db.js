const dbFactory = require('nedb-promises')

const db = {
    tags: dbFactory('test.db'),
    posts: dbFactory('data.db')
}

module.exports = db;