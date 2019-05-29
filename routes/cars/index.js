
const bodyParser = require('body-parser')
const express = require('express')
const cars = express.Router();
const bd_connection = require('../bd_connection.js');
cars.use(bodyParser.urlencoded({extended: false}))

cars.use(express.static('././public'))


cars.post('/car_create/', (req, res) =>{

    const _id_user = req.body._id_user
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
    const lkm_hwy = req.body.lkm_hwy       
    const lkm_city = req.body.lkm_city       
    const lkm_mixed = req.body.lkm_mixed       
    const body_style = req.body.body_style
    const door_number = req.body.door_number
    const drive = req.body.drive
    const engine_position = req.body.engine_position
    const engine_type = req.body.engine_type
    const car_transmission = req.body.car_transmission
    const car_drive_conditions = req.body.car_drive_conditions
    const car_tireSize = req.body.car_tireSize

    
    const queryString2 = "CALL `heroku_cd69aac1f1eff94`.`car_data`('',? ,?, ?,? ,? ,? ,? ,? ,? ,?,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, 'new', @out_param);"

    //bd_connection.
    //getConnection()
    bd_connection.query(queryString2, [_id_user,make,model,year,model_trim,license_plate,car_transmission,fuel_type,car_drive_conditions,car_tireSize,weigh_kg,engine_cc,length_mm,width_mm,height_mm
        ,lkm_hwy,lkm_city,lkm_mixed,body_style,door_number,drive,engine_position,engine_type], (err,res2,fields) => {
        if(err){
            console.log(err)
            console.log("ERROR")
            return
        }
        console.log("Inserted the new car: " , res2[0][0]["@last_id_car"])
        res.send(res2[0][0])
        //res.end()
    })
    ///res.send("yesss")
    //res.end()
    
})

cars.get('/cars/', (req, res) => {
    

    const connection = bd_connection//getConnection()


    const queryString = "CALL `heroku_cd69aac1f1eff94`.`car_data`('','' ,'' ,'' ,'' ,'' ,'' ,'' ,'','' ,'' ,'' ,'' ,'' ,'' , '','' ,'' ,'' ,'' ,'' , 'getAll', @out_param);"
    connection.query(queryString,  (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        res.json(rows)
    })

})

cars.get('/cars/:carId', (req, res) => {
    const connection = bd_connection //getConnection()

    const carId = req.body.carId

    const queryString = "CALL `heroku_cd69aac1f1eff94`.`car_data`(?,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'','' ,'' ,'' ,'' ,'' ,'' , '','' ,'' ,'' ,'' ,'' , 'getOne', @out_param);"
    connection.query(queryString, [carId], (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        res.json(rows)
    })
})

cars.get('/carsxuser/:userID', (req, res) => {
    const connection = bd_connection//getConnection()

    const userID = req.params.userID


    const queryString = "CALL `heroku_cd69aac1f1eff94`.`car_data`('',?,'', '','' ,'' ,'' ,'' ,'' ,'' ,'','','' ,'' ,'' ,'','' ,'' ,'' ,'' ,'' ,'' ,'' ,'', 'getFromUser', @out_param);"
   
    connection.query(queryString, [userID], (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        res.json(rows[0])
    })
})
module.exports = cars

///CALL `heroku_cd69aac1f1eff94`.`car_data`('2','' ,'' ,'' ,'' ,'' ,'' ,'' ,'','' ,'' ,'' ,'' ,'' ,'' , '','' ,'' ,'' ,'' ,'' , 'get', @out_param);
