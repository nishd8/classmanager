const express = require('express');
const api = require('./api')
const middleware = require('./middleware')
const app = express();
const port = 5000;



app.use(express.json());
app.use(middleware.sessionAuth)

app.listen(port, () => {
  console.log(`Class Mangement API running on port : ${port}.`);
});

app.get('/',api.apiDescription)
app.post('/users/signup',api.createNewUser)
app.post('/users/signin',api.loginUser)
app.get('/users/signout',api.logoutUser)

app.post('/classes/create',api.createClass)
app.put('/classes/update',api.updateClass)
app.delete('/classes/delete/:id',api.deleteClass)
app.get('/classes/get/:id',api.getClass)
app.get('/classes/get',api.getAllClasses)

app.post('/participations/create',api.createParticipation)
app.put('/participations/update',api.updateParticipation)
app.delete('/participations/delete/:studentId&:classId',api.deleteParticipation)
app.get('/participations/getbystudent/:studentId',api.getPartcipationByStudent)
app.get('/participations/getbyclass/:classId',api.getPartcipationByClass)
app.get('/participations/get/:studentId&:classId',api.getPartcipationByStudentAndClass)