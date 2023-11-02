//https://github.com/leifermendez/node-seed-api
require('dotenv').config()
const epxress = require('express')
//const cors = require('cors')
const app = epxress()
const router = require('./app/routes') // Importa el enrutador
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000
//app.use(cors())
app.use(epxress.json()) // Middleware para analizar datos JSON en las solicitudes


app.use('/api/1.0', router)

dbConnect()
app.listen(PORT, () => {
    console.log('API lista por el puerto ', PORT)
})