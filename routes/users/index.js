
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const users = express.Router()

const bd_connection = require('../bd_connection.js');

users.use(bodyParser.urlencoded({extended: false}))

users.use(express.static('././public'))

users.get('/messages', (req,res) => {
    console.log("Show me some mess... ")
    res.end()
})
users.post('/user_create/', (req, res) => {
    console.log("Trying to post a new user")

    const name = req.body.name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone_num = req.body.phone_num
    const password = req.body.password
    const salt = req.body.salt
    const drive_mode_def = req.body.drive_mode_def
    const car_def_id = req.body.car_def_id
    const _action = 'new'



    const queryString = "CALL `heroku_cd69aac1f1eff94`.`user_data`('',?,?,?,?,?,?,?,?,?);"
    

    //"INSERT INTO `heroku_cd69aac1f1eff94`.`users` (`name`, `last_name`, `email`, `phone_num`, `password`, `salt`, `drive_mode_def`) VALUES ('maria', 'pizarro', 'maria@gmail.com', '7565164', '1234', '1234', 'eco');
   // "
   bd_connection.query(queryString, [name,last_name,email,phone_num,password,salt,drive_mode_def,car_def_id,_action], (err,res,fields) => {
        if(err){
            console.log(err)
            console.log("Error")
            return
        }
        console.log("Inserted the new user: " , res)
        
    })
    //console.log(firstName + lastName + email+ password+driveMode)
    res.end()
})



users.get('/userGroup&Challenges/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = bd_connection

    var allInfo = []

    const paramId = req.params.id

    const queryString = "CALL `heroku_cd69aac1f1eff94`.`get_AllChallenges`()";

    
    connection.query(queryString, (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        allInfo.push(rows)


        const queryString2 = "CALL `heroku_cd69aac1f1eff94`.`get_MyChallenges`(?);";
 
        connection.query(queryString2, [paramId], (err, rows2, fields)=>{
            if(err){
                res.sendStatus(500)
                console.log(err)
                res.end()
                return
            }
            allInfo.push(rows2)

            const queryString3 = "CALL `heroku_cd69aac1f1eff94`.`get_MyGroups`(?);";
    
            connection.query(queryString3, [paramId], (err, rows3, fields)=>{
                if(err){
                    res.sendStatus(500)
                    console.log(err)
                    res.end()
                    return
                }
                allInfo.push(rows3)
                res.json(allInfo)

                res.end()
            })
        })
    })
})


users.get('/userId/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = bd_connection

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

users.get('/prueba', (req, res) => {
    console.log("Fetching LASTNAME: ")

    const connection = bd_connection

    const last_name = req.body.idUser

    const queryString = " CALL `heroku_cd69aac1f1eff94`.`groups_data`( '', '122', '2', 'grupo 2', 'grupo 2', 'new', @id_out_group, @id_out_user ); "
    const paramId = req.params.id
    connection.query(queryString, (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: " + last_name)
            res.end()
            return
        }
        var name = rows[0][0]["_id_out_group"]
        var name2 = rows[0][0]["_id_out_userCar"]
        //res.send(name)
        console.log(name)
        console.log(name2)
    })

})



users.post('/set_newCar/', (req, res) => {

    const connection = bd_connection

    const id_user = req.body.id_user
    const id_car = req.body.id_car

    const action = 'changeCarDef'

    const query_addChallenge = "CALL `heroku_cd69aac1f1eff94`.`user_data`(?,'','','','','','','',?,?)"

    connection.query(query_addChallenge, [id_user,id_car,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Set new car")
            res.end()
            return
        }
        
        res.send("Exito")
        console.log("Exito")
    })

})

users.post('/set_newDriveMode/', (req, res) => {

    const connection = bd_connection

    const id_user = req.body.id_user
    const drive_mode = req.body.drive_mode

    const action = 'changeDriveMode'

    const query_addChallenge = "CALL `heroku_cd69aac1f1eff94`.`user_data`(?,'','','','','','',?,'',?)"

    connection.query(query_addChallenge, [id_user,drive_mode,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Set new drive mode")
            res.end()
            return
        }
        
        res.send("Exito")
        console.log("Exito")
    })

})


//CALL `heroku_cd69aac1f1eff94`.`prueba`(@out_name);

users.get('/user/:username', (req, res) => {
    console.log("Fetching user with username: " + req.params.username)

    const connection = bd_connection
    var response = []

    const queryString = "CALL `heroku_cd69aac1f1eff94`.`user_data`('','','',?,'','','','','','getPass')"
    const paramEmail = req.params.username
    connection.query(queryString, [paramEmail], (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        if(rows[0][0]){
            response.push(rows[0][0])
            response[0].Response = "Found"
            console.log("rows")
            res.json(response)
        }
        else{
            console.log("Not found")
            res.status(200).json({ Response: 'Not found!' });
        }
        
    })
})


users.get('/users', (req, res) => {
    
    console.log("Trying to ger users")
    const connection = bd_connection

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


module.exports = users