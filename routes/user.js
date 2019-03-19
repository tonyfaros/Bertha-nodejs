
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')

const router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

router.use(express.static('././public'))

router.get('/messages', (req,res) => {
    console.log("Show me some mess... ")
    res.end()
})

router.post('/user_create', (req, res) => {
    console.log("Trying to post a new user")

    const name = req.body.name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone_num = req.body.phone_num
    const password = req.body.password
    const salt = req.body.salt
    const drive_mode_def = req.body.drive_mode_def

    console.log(name)
    console.log(last_name)
    console.log(email)
    console.log(phone_num)
    console.log(password)
    console.log(salt)
    console.log(drive_mode_def)
    console.log("--------------------------------------------")

    const queryString = "insert into users ('name','last_name','email','phone_num','password','salt','drive_mode_def') VALUES (?, ?, ?, ?, ?, ?, ?);"


    //"INSERT INTO `heroku_cd69aac1f1eff94`.`users` (`name`, `last_name`, `email`, `phone_num`, `password`, `salt`, `drive_mode_def`) VALUES ('maria', 'pizarro', 'maria@gmail.com', '7565164', '1234', '1234', 'eco');
   // "
    getConnection().query(queryString, [name,last_name,email,phone_num,password,salt,drive_mode_def], (err,res,fields) => {
        if(err){
            console.log(err)
            console.log("ERROR")
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Inserted the new user: " , res.id)
        
    })
    //console.log(firstName + lastName + email+ password+driveMode)
    res.end()
})

router.get('/userId/:id', (req, res) => {
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

router.get('/user/:username', (req, res) => {
    console.log("Fetching user with username: " + req.params.username)

    const connection = getConnection()

    const queryString = 'select * from users where name = ?'
    const paramEmail = req.params.username
    connection.query(queryString, [paramEmail], (err, rows, fields)=>{
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

module.exports = router