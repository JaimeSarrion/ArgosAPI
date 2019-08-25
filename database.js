const mysql = require('mysql')

const db_config = { //si necesitas las credenciales contacta conmigo
  database : 'argosbd',
  host     : 'localhost',
  user     : 'argosbd',
  password : 'argos1234' 
}

exports.db_config = db_config

var mysqlPool = mysql.createPool(db_config); 

exports.getPatients = function(res, callback){ //Return all the patients of a doctor

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