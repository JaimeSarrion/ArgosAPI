//TOOLS
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


//FOLDERS
const patients = require('./models/patients')
const middleware = require('./models/middleware')
const doctors = require('./models/doctors')
const cors = require('cors')
app.use(cors())

//ROUTE INITIALIZATION
const router = express.Router()
router.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded
app.use(router)

//CONSTANTS
const port = 10000;
const hostname = process.env.PORT

//ROUTING
app.post('/login', middleware.login) //login
app.get('/pacientes',middleware.isLoged, patients.showPatients)//list of patients 
app.post('/registro', doctors.register)//sign up


//SERVER

/*
//LOCAL
app.listen( port,hostname, function() {
  console.log(`Servidor express iniciado en http://${hostname}:${port}`)
})
*/

/*
HEROKU
*/

var port_number = app.listen(hostname || port, () => {
  console.log(`Server running at http://${process.env.PORT}:${port}/`);
});

app.listen(port_number);

module.exports = app