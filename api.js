const { request, response } = require("express")
const serializer = require('./serializer')
const utils = require('./utility')
const Pool = require('pg').Pool;

const db = new Pool({
  user: 'nishad',
  host: 'localhost',
  database: 'classmanager',
  password: 'nishad',
  port: 5432
});


const apiDescription = (request,response) =>{
    response.sendFile('index.html', { root: __dirname })
}


//------------------------------------------------------------
// User Management
const createNewUser = (request,response) =>{
    const payload = request.body
    if(serializer.checkUser(payload)){
        db.query(
            'INSERT INTO users (name,email,password,is_teacher) VALUES ($1,$2,$3,$4)',[payload.name,payload.email,payload.password,payload.isTeacher]
            ,(error,results) =>{
                if(error){
                    response.status(400).json(error.detail)    
                }
                response.status(201).json('User Registered')
            }
        )
    }
    else{
        response.status(400).json('User Not Registered')
    }

}

const loginUser = (request,response) =>{
    const payload = request.body
    if(utils.checkPwd(payload.password).status){
        db.query(
            `SELECT * FROM users WHERE email=$1 and password=$2`,[payload.email,payload.password],(error,results) =>{
                if(error){
                    response.status(400).json(error.detail)    
                }
                if(results.rows.length==1){
                    const user = results.rows[0]
                    const session_token = utils.getToken() ;
                    user['session_token']= session_token
                    delete user.password
                    setToken(user.id,session_token)
                    response.status(200).json(user)
                }
            }
        )
    }
    else{
        response.status(400).json('User Not Registered')
    }

}

const logoutUser = (request,response) =>{
    const token = request.headers.authorization
    const sessionStatus=endSession(token)
    if(sessionStatus){
        response.status(200).json("Signed Out")
    }
    else{
        response.status(400).json("Error Occured")
    }

}
const getUserName = async (id) =>{
    const result = await db.query('SELECT name FROM users WHERE id=$1',[id])
    console.log(result.rows[0].name)
    return result.rows[0].name
}
//------------------------------------------------------------



//------------------------------------------------------------
//session Management 
const setToken =  (id,token) =>{
    const sessionStatus = getSessionById(id)
    if(sessionStatus){
        db.query(`UPDATE sessions SET session_token=$1, is_session=$2 WHERE user_id=$3`,[token,true,id])
    }
    else{
        db.query(`INSERT INTO sessions (user_id,session_token,is_session) VALUES ($1,$2,$3)`,[id,token,true])
    }
}

const getSessionById = async (id) =>{
    try{
        const result = await db.query(`SELECT * FROM sessions WHERE user_id= $1`,[id])
        if(result.rows.length==1){
            return true
        }
        else{
            return false
        }                   
    }
    catch(err){
        console.log(err)
    }
}

const getSessionByToken = async (token) =>{
    try{
        const result = await db.query(`SELECT * FROM sessions WHERE session_token= $1 and is_session=$2`,[token,true])
        if(result.rows.length==1){
            return true
        }
        else{
            return false
        }                   
    }
    catch(err){
        console.log(err)
    }
}

const endSession = async(token) =>{
    try{
        const result = await db.query(`UPDATE sessions SET is_session=$1 WHERE session_token=$2`,[false,token])
        return true
    }
    catch(e){
        console.log(e)
        return false
    }
}
//------------------------------------------------------------



//------------------------------------------------------------
//Class Management
const createClass = (request,response) =>{
    const payload = request.body
    db.query(`INSERT INTO classes (teacher_id,class_date,class_start_at,class_end_at) VALUES(
            $1,$2,$3,$4
        )`,[payload.teacherId,payload.classDate,payload.classStart,payload.classEnd],(error,result)=>{
            if(error){
                response.status(400).json(error.detail)    
            }
            response.status(201).json('Class Created')
        })
}
const updateClass = (request,response) =>{
    const payload = request.body
    db.query(`UPDATE classes SET class_date=$1,class_start_at=$2,class_end_at=$3 WHERE class_id=$4` 
    ,[payload.classDate,payload.classStart,payload.classEnd,payload.classId],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)
        }
        console.log(result)
        response.status(200).json('Class Updated')
    })
}
const deleteClass = (request,response) =>{
    const payload = request.params.id    
    db.query(`DELETE FROM classes WHERE class_id=$1`,[payload],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        response.status(200).json('Class Deleted')
    })
}
const getClass = (request,response) =>{
    const payload = request.params.id    
    db.query(`SELECT * FROM classes WHERE class_id=$1`,[payload],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        response.status(200).json(result.rows[0])
    })
}
const getAllClasses = (request,response) =>{    
    db.query(`SELECT * FROM classes`,async (error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        for(const c of result.rows)
        {
            c.teacher= await getUserName(c.teacher_id)
        }
        response.status(200).json(result.rows)
    })
}
//------------------------------------------------------------





//------------------------------------------------------------
//Participation Management
const createParticipation = (request,response) =>{
    const payload = request.body
    db.query(`INSERT INTO participations (class_id,student_id,is_allowed) VALUES(
            $1,$2,$3
        )`,[payload.classId,payload.studentId,false],(error,result)=>{
            if(error){
                response.status(400).json(error.detail)    
            }
            response.status(201).json('Participation Created')
        })
}
const updateParticipation = (request,response) =>{
    const payload = request.body
    db.query(`UPDATE participations SET is_allowed=$1 WHERE participation_id=$2` 
    ,[payload.isAllowed,payload.participationId],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)
        }
        console.log(result)
        response.status(200).json('Participation Updated')
    })
}
const deleteParticipation = (request,response) =>{
    const payload = request.params
    db.query(`DELETE FROM participations WHERE student_id=$1 and class_id=$2`,[payload.studentId,payload.classId],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        response.status(200).json('Participation Deleted')
    })
}
const getPartcipationByStudent = (request,response) =>{
    const payload = request.params.studentId    
    db.query(`SELECT * FROM participations WHERE student_id=$1`,[payload],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        response.status(200).json(result.rows)
    })
}
const getPartcipationByStudentAndClass = (request,response) =>{
    const payload = request.params    
    db.query(`SELECT * FROM participations WHERE student_id=$1 and class_id=$2`,[payload.studentId,payload.classId],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        response.status(200).json(result.rows)
    })
}
const getPartcipationByClass = (request,response) =>{
    const payload = request.params.classId    
    db.query(`SELECT * FROM participations WHERE class_id=$1`,[payload],(error,result)=>{
        if(error){
            response.status(400).json(error.detail)    
        }
        response.status(200).json(result.rows)
    })
}
//------------------------------------------------------------

module.exports = {
    apiDescription,
    createNewUser,loginUser,getSessionById,getSessionByToken,logoutUser,
    createClass,updateClass,deleteClass,getClass,getAllClasses,
    createParticipation,updateParticipation,deleteParticipation,getPartcipationByClass,getPartcipationByStudent,getPartcipationByStudentAndClass
}