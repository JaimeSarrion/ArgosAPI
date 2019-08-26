const database = require('./../database')
const middleware = require('./middleware')

exports.showPatients = function(req, res){
    var token = req.headers.authorization
    try{
        var user = middleware.decode(token)
    }catch(err){
        res.status(401)
        res.send({'error':'El token está corrupto'})
    }
    database.getPatients(res, user.id, function(pacientes){
        if(pacientes != null){
            res.status(200)
            res.send(pacientes)
        }else{
            res.status(200)
            res.send({'msg' : 'No tiene pacientes asignados'})
        }
    })
}