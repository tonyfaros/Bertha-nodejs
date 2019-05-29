const bodyParser = require('body-parser')
const express = require('express')
const bd_connection = require('../bd_connection.js');

const fuelLog = express.Router()

fuelLog.use(bodyParser.urlencoded({extended: false}))

fuelLog.use(express.static('././public'))

fuelLog.post('/fuel_log/', (req, res) => {
    console.log("Posting new log")


    const idUser = req.body.idUser
    const idCar = req.body.idCar
    const date = req.body.date
    const time = req.body.time
    const odometer_current = req.body.odometer_current
    const km_traveled =  req.body.km_traveled
    const liters_qtty = req.body.liters_qtty
    const total_price = req.body.total_price
    const price_perLiter = req.body.price_perLiter
    const fuel_type = req.body.fuel_type
    const place_fuelUp = req.body.place_fuelUp
    const city_drivingPrctg = req.body.city_drivingPrctg
    const partial_fuelUp = req.body.partial_fuelUp
    const _action = 'new'

    const queryString = "CALL `heroku_cd69aac1f1eff94`.`fuelLogs_data`(?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?,?,?);"


    bd_connection.query(queryString,[idUser,idCar,date,time,odometer_current,km_traveled,liters_qtty,total_price,price_perLiter,
                        fuel_type,place_fuelUp,city_drivingPrctg,partial_fuelUp,_action], (err, rows)=>{
        if(err){
            console.log(err)
            console.log("Here: Fuel log error")
            return
        }
        console.log("Success posting log")
    })
    res.end()

})

fuelLog.get('/getLogsxUser/', (req, res) => {
    console.log("Getting the logs from user") 

    const connection = bd_connection

    const idUser = req.body.idUser
    const idCar = req.body.idCar

    console.log(idCar)
    console.log(idUser)
    
    const _action = 'getAllFromUser'

    const queryString = " CALL `heroku_cd69aac1f1eff94`.`fuelLogs_data`(?, ?, '','', '', '','', '','', '', '', '','',?);"

    connection.query(queryString,[idUser,idCar,_action], (err, rows)=>{
        if(err){
            console.log(err)
            console.log("Here: Fuel log error")
            res.end()
            return
        }
        res.json(rows)
    })


})


module.exports = fuelLog