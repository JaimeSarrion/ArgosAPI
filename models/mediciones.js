const database = require('../database')

exports.showMediciones = function(req, res){
    var paciente = req.headers.codpaciente
    if (paciente && paciente != '') {
        database.getMediciones(res, paciente, function(mediciones){
            if(mediciones != null){
                res.status(200)
                res.send(mediciones)
            }else{
                res.status(200)
                res.send({'error' : 'No tiene mediciones disponibles'})
            }
        })
    }
}


exports.setMediciones = function(req, res){
    var medicion = {
        codpaciente: req.headers.codpaciente,
        medicion: req.header.medicion
    }
    if (medicion.codpaciente && medicion.codpaciente != '' && medicion.medicion && medicion.medicion != '') {
        database.setMediciones(res, medicion, function(mediciones){
            if(mediciones != null){
                res.status(200)
                res.send(mediciones)
            }else{
                res.status(400)
                res.send({'error' : 'No es posible guardar mediciones'})
            }
        })
    }
}