//scripts es usado para darle instruciones al servidor, parecido a lo que hace el package.json o webpack


//fs es un móduo de node
const fs =require('fs')

fs.writeFileSync('./.env', `API=${process.env.API}\n`)
