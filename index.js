const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbconnection = require('./dbconnection');
const StudentRouter = require('./routes/StudentRouter');
const AuthRouter = require('./routes/UserRouter');
const configSession = require('./Middlewares/SessionMiddleware');
const isAuthenticated = require('./Middlewares/isAuthenticated');
const TokenRouter=require('./routes/TokenRouter')

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(configSession);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbconnection();



app.use('/',AuthRouter)
app.use('/student',isAuthenticated,StudentRouter)
app.use('/token',TokenRouter)




app.listen(process.env._PORT,()=>{
    console.log(`server is running on http://${process.env._HOST}:${process.env._PORT}`);
});