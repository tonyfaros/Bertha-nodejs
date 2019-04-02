
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const users = express.Router()

users.use(bodyParser.urlencoded({extended: false}))

users.use(express.static('././public'))

users.get('/messages', (req,res) => {
    console.log("Show me some mess... ")
    res.end()
})
/*
users.post('/car_create/', (req, res) =>{
    
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year
    const license_plate = req.body.license_plate
    const fuel_type = req.body.fuel_type
    const weigh_kg = req.body.weigh_kg
    const model_trim = req.body.model_trim
    const engine_cc = req.body.engine_cc
    const length_mm = req.body.length_mm
    const width_mm = req.body.width_mm
    const height_mm = req.body.height_mm
    const mpg_hwy = req.body.mpg_hwy       //HAY QUE CAMBIARLO
    const mpg_city = req.body.mpg_city       //HAY QUE CAMBIARLO
    const mpg_mixed = req.body.impg_mixedd       //HAY QUE CAMBIARLO
    const body_style = req.body.body_style
    const door_number = req.body.door_number
    const drive = req.body.drive
    const engine_position = req.body.engine_position
    const engine_type = req.body.engine_type

    const queryString = "insert into cars (make, model,year,licence_plate,fuel_type, weigh_kg,model_trim,engine_cc, length_mm, width_mm,height_mm,mpg_hwy,mpg_city, mpg_mixed,body_style,door_number,drive,engine_position,engine_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"


  
    getConnection().query(queryString, [make,model,year,license_plate,fuel_type,weigh_kg,model_trim,engine_cc,length_mm,width_mm,height_mm
        ,mpg_hwy,mpg_city,mpg_mixed,body_style,door_number,drive,engine_position,engine_type], (err,res,fields) => {
        if(err){
            console.log(err)
            console.log("ERROR")
            return
        }
        console.log("Inserted the new car: " , res)
        
    })
    res.end()
    
})
*/
users.post('/user_create/', (req, res) => {
    console.log("Trying to post a new user")

    const name = req.body.name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone_num = req.body.phone_num
    var password = req.body.password
    const salt = req.body.salt
    const drive_mode_def = req.body.drive_mode_def
    const _action = 'new'



    const queryString = "CALL `heroku_cd69aac1f1eff94`.`create_user`(?,? ,?, ?, ?,? ,? ,?);"
    


    //"INSERT INTO `heroku_cd69aac1f1eff94`.`users` (`name`, `last_name`, `email`, `phone_num`, `password`, `salt`, `drive_mode_def`) VALUES ('maria', 'pizarro', 'maria@gmail.com', '7565164', '1234', '1234', 'eco');
   // "
    getConnection().query(queryString, [name,last_name,email,phone_num,password,salt,drive_mode_def,_action], (err,res,fields) => {
        if(err){
            console.log(err)
            console.log("ERROR")
            return
        }
        console.log("Inserted the new user: " , res)
        
    })
    //console.log(firstName + lastName + email+ password+driveMode)
    res.end()
})

users.get('/userId/:id', (req, res) => {
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

users.get('/prueba', (req, res) => {
    console.log("Fetching LASTNAME: ")

    const connection = getConnection()

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


users.post('/create_group/', (req, res) => {
    console.log("Fetching LASTNAME: ")

    const connection = getConnection()

    const id_user = req.body.id_user
    const id_car = req.body.id_car

    const name_group = req.body.name_group
    const description_group = req.body.description_group
    const action = 'new'

    const query_new_group = "CALL `heroku_cd69aac1f1eff94`.`groups_data`('',?,?,?,?,?,  @id_out_group, @id_out_user );"
    const paramId = req.params.id
    connection.query(query_new_group, [id_user,id_car,name_group,description_group,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: " + last_name)
            res.end()
            return
        }
        const query_link_user = "CALL `heroku_cd69aac1f1eff94`.`groups_per_user_data`('', ?, ?, 'new');"
        const id_new_group = rows[0][0]["_id_out_group"]
        const id_user_car = rows[0][0]["_id_out_userCar"]
        connection.query(query_link_user, [id_new_group,id_user_car], (err, rows)=>{
            if(err){
                res.sendStatus(500)
                console.log(err)
                console.log("HERE: ")
                res.end()
                return
            }
            res.send("Exito")
            console.log("Exito")
        })

    })

})


//CALL `heroku_cd69aac1f1eff94`.`prueba`(@out_name);

users.get('/user/:username', (req, res) => {
    console.log("Fetching user with username: " + req.params.username)

    const connection = getConnection()

    const queryString = 'select users.password, users.salt from users where email = ?'
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

users.get('/users', (req, res) => {
    
    console.log("Trying to ger users")
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

module.exports = users