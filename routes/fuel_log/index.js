const bodyParser = require('body-parser')
const express = require('express')
const bd_connection = require('../bd_connection.js');

const fuelLog = express.Router()

fuelLog.use(bodyParser.urlencoded({extended: false}))

fuelLog.use(express.static('././public'))

fuelLog.post('/fuelLog/', (req, res) => {
    console.log("Posting new log")

    const connection = bd_connection

    const idUser = req.params.idUser
    const idCar = req.params.idCar
    const date = req.params.date
    const time = req.params.time
    const odometer_current = req.params.odometer_current
    const km_traveled =  req.params.km_traveled
    const liters_qtty = req.params.liters_qtty
    const total_price = req.params.total_price
    const price_perLiter = req.params.price_perLiter
    const fuel_type = req.params.fuel_type
    const place_fuelUp = req.params.place_fuelUp
    const city_drivingPrctg = req.params.city_drivingPrctg
    const partial_fuelUp = req.params.partial_fuelUp
    const _action = 'new'

    const queryString = "CALL `heroku_cd69aac1f1eff94`.`fuelLogs_data`(?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?,?,?,?);"


    connection.query(queryString,[idUser,idCar,date,time,odometer_current,km_traveled,liters_qtty,total_price,price_perLiter,
                        fuel_type,place_fuelUp,city_drivingPrctg,partial_fuelUp,_action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("Here: Fuel log error")
            res.end()
            return
        }
        console.log(name)
    })

})

fuelLog.get('/getLogsxUser/', (req, res) => {
    console.log("Getting the logs from user") 

    const connection = bd_connection

    const idUser = req.params.idUser
    const idCar = req.params.idCar

    const _action = 'getAllFromUser'

    const queryString = " CALL `heroku_cd69aac1f1eff94`.`fuelLogs_data`(?, ?, '', '', '', '', '', '','', '', '',?);"


    connection.query(queryString,[idUser,idCar,_action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("Here: Fuel log error")
            res.end()
            return
        }
        console.log(name)
    })

})


module.exports = fuelLog