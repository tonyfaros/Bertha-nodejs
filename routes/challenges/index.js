
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const users = express.Router()


users.use(bodyParser.urlencoded({extended: false}))

users.use(express.static('././public'))

users.post('/link_challenge/', (req, res) => {

    const connection = getConnection()

    const id_user = req.body.id_user
    const id_challenge = req.body.id_challenge

    const action = 'newChallenge'

    const query_addChallenge = "CALL `heroku_cd69aac1f1eff94`.`link_challengeXuser`( ?, ?, ?);"

    connection.query(query_addChallenge, [id_user,id_challenge,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Link challenge")
            res.end()
            return
        }
        
        res.send("Exito")
        console.log("Exito")
    })

})

users.post('/drop_challenge/', (req, res) => {

    const connection = getConnection()

    const id_challenge = req.body.id_challenge
    const id_user = req.body.id_user
    const action = 'dropChallenge'

    const query_dropChallenge = "CALL `heroku_cd69aac1f1eff94`.`link_challengeXuser`( ?, ?, ?);"

    connection.query(query_dropChallenge, [id_user,id_challenge,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Drop challenge")
            res.end()
            return
        }
        
        res.send("Exito")
        console.log("Exito")
    })

})


const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    //port: '3306',
    user: 'b2422c79d1fa8f',
    password: '8649bbd4',
    database:'heroku_cd69aac1f1eff94',
    multipleStatements: 'true'

})

function getConnection(){
    return pool
}

module.exports = challenges