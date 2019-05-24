const mysql = require('mysql')
exports.pool = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-iron-east-03.cleardb.net',
    //port: '3306',
    user: 'b2422c79d1fa8f',
    password: '8649bbd4',
    database:'heroku_cd69aac1f1eff94'

})

function getConnection(){
    return pool
}

