const util = require('./utility')
const checkUser=(user) =>{
    if(user.name==undefined){
        return false;
    }
    if(!util.checkPwd(user.password).status){
        return false;
    }
    if(user.email==undefined){
        return false;
    }
    if(user.is_teacher==undefined){
        return false;
    }
    return true
}

module.exports = {
    checkUser
}