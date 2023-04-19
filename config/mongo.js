const mongoose = require('mongoose')

const dbConnectNoSql = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado correctamente")
    }).catch(() => {
        console.log("Error al conectar")
    })
}

module.exports = dbConnectNoSql