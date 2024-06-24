const express=require('express')
const router=express.Router()
const {GetToken,getdata}=require('../Controllers/TokenAuthController')
const Tokkenauthentification=require('../Middlewares/Tokkenauthentification')

router.get('/',GetToken);

router.get('/getdata',Tokkenauthentification,getdata);



module.exports=router;