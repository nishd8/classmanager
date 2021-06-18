const crypto = require("crypto");

const checkPwd = (str) => {
    if(str.length == undefined){
        return ({message:"undefined",status:false})
    }
    if (str.length < 6) {
        return ({message:"too_short",status:false})
    }
    if (str.length > 20) {
        return ({message:"too_long",status:false})
    } 
    if (str.search(/\d/) == -1) {
        return ({message:"no_num",status:false})
    }
    if (str.search(/[a-zA-Z]/) == -1) {
        return ({message:"no_letter",status:false})
    }
    if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1) {
        return ({message:"bad_char",status:false})
    }
    return ({message:"ok",status:true})
}

const getToken = () =>{
    return  crypto.randomBytes(30).toString('hex')
}

module.exports = {
    checkPwd,getToken
}