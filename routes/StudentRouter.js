const express=require('express')
const router=express.Router()
const {addStudent,getStudent,updateStudent,deleteStudent} =require('../Controllers/StudentController')

router.get('/:id?',getStudent);

router.post('/',addStudent);

router.put('/',updateStudent);

router.delete('/',deleteStudent);

module.exports=router;