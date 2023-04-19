const express = require("express")
const fs = require("fs")
const router = express.Router()


//CON ESTO VAMOS A LINKAR CADA DIRECTORIO A UNA RUTA ASCIADA A SU LOGICA

const removeExtension = (filename) => {
    return filename.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file)

    if(name != 'index') {
        router.use('/' + name, require('./' + name))
    }
})

module.exports = router