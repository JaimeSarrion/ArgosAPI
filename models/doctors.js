const database = require('./../database')

exports.register = function(req , res){
    var doctor = req.body
    if(doctor){
        if((!doctor.nombre || !doctor.apellidos || !doctor.DNI || !doctor.email || !doctor.password) && 
        (doctor.nombre != '' && doctor.apellidos != '' && doctor.DNI != '' && doctor.email != '' && doctor.password != '')){
            database.createDoctor(res, doctor, function(rows){
                if(rows.affectedRows == 1){
                    res.status(200)
                    res.send({'OK':'Se ha insertado correctamente'})
                }else{
                    res.status(500)
                    res.send({'error':'No se ha podido insertar correctamente'})
                }
            })
        }else{
            res.status(400)
            res.send({'error':'Faltan datos o estan incompletos'})
        }
    }else{
        res.status(400)
        res.send({'error':'Faltan datos o estan incompletos'})
    }
    
}