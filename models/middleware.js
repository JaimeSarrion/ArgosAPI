
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