const database = require('../database')
const middleware = require('../models/middleware')

exports.showTareas = function(req, res){
    var token = req.headers.authorization

    try{
        var user = middleware.decode(token)
    }catch(err){
        res.status(401)
        res.send({'error':'El token está corrupto'})
    }

    database.getTareas(res, user.id, function(tareas){
        if(tareas != null){
            res.status(200)
            res.send(tareas)
        }else{
            res.status(200)
            res.send({'msg' : 'No tiene pacientes asignados'})
        }
    })


}