const mysql = require('mysql')

const db_config = { //si necesitas las credenciales contacta conmigo
  database : 'zvcyqw0ft11vuoho',
  host     : 'p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'dq03p6antrkootfi',
  password : 'n9gc6ycixcs3ljs8' 
}

exports.db_config = db_config

var mysqlPool = mysql.createPool(db_config); 

exports.getPatients = function(res, id ,callback){ //Return all the patients of a doctor
  mysqlPool.getConnection(function(err, db) {
    if(!err){ 
      db.query('CALL sp_Spacientes(?)',[id],function(err, rows){
        if(!err){
          if(rows.length>0){
            callback(rows)
          } else{
            callback(null)
          }
        }else{
          console.log(err.message)
          res.status(500)
          res.send({'error':'Problema con la base de datos'})
        }
        db.release()
      })
    }else{
      console.log(err.message)
      res.status(500)
      res.send({'error':'Problema con la base de datos'})
    }
  })
}

exports.getLoginUser = function(res, email, callback){ //Return all the patients of a doctor
  mysqlPool.getConnection(function(err, db) {
    if(!err){ 
      db.query('Select * from `medicos` where email = ?',[email],function(err, rows){
        if(!err){
          if(rows.length>0){
            callback(rows[0])
          } else{
            callback(null)
          }
        }else{
          console.log(err.message)
          res.status(500)
          res.send({'error':'Problema con la base de datos'})
        }
        db.release()
      })
    }else{
      console.log(err.message)
      res.status(500)
      res.send({'error':'Problema con la base de datos'})
    }
  })
}

exports.getUserById = function(res,id,callback){
  mysqlPool.getConnection(function(err, db) {
    if(!err){
      db.query('SELECT * FROM medicos WHERE codMedico=?', [id], function(err, rows) {
        if(!err){
          if(rows.length>0){
            callback(rows[0])
          } else{
            callback(null)
          }
        } else{
          console.log(err.message)
          res.status(500)
          res.send({'error':'Problema con la base de datos'})
        }
        db.release()
      })
    } else{
      console.log(err.message)
      res.status(500)
      res.send({'error':'Problema de conexión con la base de datos'})
    }
  })
}

exports.createDoctor = function(res, doctor, callback){
  mysqlPool.getConnection(function(err, db) {
    if(!err){
      
      db.query('INSERT INTO `medicos` (`Nombre`, `Apellidos`, `dni`, `email`, `password`) VALUES ( ?, ?, ?, ?, ?);',
       [doctor.nombre, doctor.apellidos, doctor.dni, doctor.email, doctor.password], function(err, rows) {
        if(!err){
          console.log(rows)
          callback(rows)
        } else{
          console.log(err.message)
          res.status(500)
          res.send({'error':'Problema con la base de datos'})
        }
        db.release()
      })
    } else{
      console.log(err.message)
      res.status(500)
      res.send({'error':'Problema de conexión con la base de datos'})
    }
  })
}