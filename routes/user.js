
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')

const router = express.Router()

router.get('/messages', (req,res) => {
    console.log("Show me some mess... ")
    res.end()
})

router.post('/user_create', (req, res) => {
    console.log("Trying to post a new user")

    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const email = req.body.email
    const password = req.body.password
    const driveMode = req.body.drive_mode

    const queryString = "insert into users (name,last_name,email,password,drive_mode_def) VALUES (?, ?, ?, ?, ?)"

    getConnection().query(queryString, [firstName,lastName,email,password,driveMode], (err,res,fields) => {
        if(err){
            console.log(err)
            console.log("ERROOORRRR")
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Inserted the new user: " , res.id)
        
    })
    //console.log(firstName + lastName + email+ password+driveMode)
    res.end()
})

router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const queryString = 'select * from users where id = ?'
    const paramId = req.params.id
    connection.query(queryString, [paramId], (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        res.json(rows)
    })

})

router.get('/users', (req, res) => {
    

    const connection = getConnection()

    const queryString = 'select * from users'
    connection.query(queryString, (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        res.json(rows)
    })

})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3306',
    user: 'tony',
    password: '1234',
    database:'berthatemp1'

})

function getConnection(){
    return pool
}

module.exports = router