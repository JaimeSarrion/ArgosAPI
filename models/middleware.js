
const jwt = require('jwt-simple')
const moment = require('moment')
const database = require('./../database')

const secret = 'VeyG9pvFf7'

exports.createToken = createToken = function(id, email, pass) {
    var payload = {
        id: id,
        email: email,
        password: pass,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix(),
    }
    return jwt.encode(payload, secret)
}


exports.login = function(req , res){
    var email = req.body.email
    var pass = req.body.password
    if(email != '' && pass != ''){
        database.getLoginUser(res, email, function(user){
            if(user != null){
                if(user.email != email){
                    res.status(400)
                    res.send({'error':'Credenciales incorrectas'})
                }else if(pass != user.password){
                    res.status(401)
                    res.send({'error':'Credenciales incorrectas'})
                }else{
                    var array = new Array()
                    array.push({'id':user.codMedico, 'email':email, 'token':createToken(user.id, email, user.pass)})
                    res.status(200)
                    res.send(array)
                }
            }else{
                res.status(400)
                res.send({'error' : 'Credenciales incorrectas'})
            }
        })
    }else{
        var error_email = (!email) ? ' El parametro email es incorrecto' : ''
        var error_pass = (!pass) ? ' El parametro password es incorrecto' : ''
        res.status(400)
        res.send({'error' : 'Error en el login' + error_email + error_pass})
    }
}


exports.isLoged = function(req, res, next){//Check is the user is logged
    if(req.headers.authorization){
        var token = req.headers.authorization
        try{
            var decoded = jwt.decode(token, secret)
        } catch(e){
            res.status(401)
            res.send({'error':'El token está corrupto'})
        }
        if (decoded && decoded.id) {
            if(decoded.exp <= moment.unix()){
                res.status(401)
                res.send({'error':'El token ha expirado'})
            } else{
                database.getUser_id(res, decoded.id, function(user){
                    if(user == null){
                        res.status(401)
                        res.send({'error':'Hay un problema con tu usuario (No existe)'})
                    } else if(user.username != decoded.username){
                        res.status(401)
                        res.send({'error':'Hay un problema con tu usuario y el token'})
                    } else if(user.password && decoded.password && user.password != decoded.password){
                        res.status(401)
                        res.send({'error':'Hay un problema con tu password y la del token'})
                    } else{
                        next()
                    }
                })
            }
        }
    } else{
        res.status(401)
        res.send({'error':'Sin cabeceras de autorizacion (Sin loguear)'})
    }
}