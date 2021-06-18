const api = require('./api')

const sessionAuth = async (req, res, next) =>{
    const excludePaths=['/users/signup','/users/signin','/','/er.png']
    if(excludePaths.includes(req.path)){
      next()
    }
    else{
      const sessionToken = req.headers.authorization
      const sessionStatus = await api.getSessionByToken(sessionToken)
      if(sessionStatus){
        next()
      }
      else{
        res.status(401).json("Session Couldn't be authenticated")
      }
    }
}

module.exports={
    sessionAuth
}