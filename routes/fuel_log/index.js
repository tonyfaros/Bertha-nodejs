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
    const date = req.params.idUser
    const time = req.params.idCar
    const odometer_current = req.params.idUser
    const liters_qtty = req.params.idCar
    const total_price = req.params.idUser
    const price_perLiter = req.params.idCar
    const fuel_type = req.params.idUser
    const city_drivingPrctg = req.params.idCar
    const partial_fuelUp = req.params.idUser
    const _action = 'new'


    const queryString = "CALL `heroku_cd69aac1f1eff94`.`fuelLogs_data`(?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?,?);"


    connection.query(queryString,[idUser,idCar,date,time,odometer_current,liters_qtty,total_price,price_perLiter,
                        fuel_type,city_drivingPrctg,partial_fuelUp,_action], (err, rows)=>{
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