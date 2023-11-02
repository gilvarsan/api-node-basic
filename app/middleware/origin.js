//FUNCION PARA VALIDAR SI EL USUARIO ESTA AUTORIZADO PARA REALIZAR LA PETICIÓN
const checkOrigin = (req, res, next) => {
    // EN EL BODY => HEADERS SE COLOCA LA VARIABLE O KEY "Authorization" CON VALOR "Bearer 123456"
    const token = req.headers.authorization.split(' ').pop()
    //console.log('token >> ', token)
    if(token === '123456'){
        console.log('usuario valido')
        next()
    }else{
        console.log('usuario no valido')
    }
    
    console.log(req.headers)
    
}

module.exports = checkOrigin