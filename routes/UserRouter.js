const express=require('express')
const router=express.Router()
const {index,register,login,logout}=require('../Controllers/AuthController')

router.get('/',index)
router.post('/',login)
router.post('/register',register)
router.get('/logout',logout)


module.exports=router;