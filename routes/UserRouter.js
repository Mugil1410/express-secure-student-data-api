const express=require('express')
const router=express.Router()
const {register,login,logout}=require('../Controllers/AuthController')

router.get('/',login)
router.post('/register',register)
router.get('/logout',logout)


module.exports=router;