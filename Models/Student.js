const mongoose=require('mongoose')
// Define the schema
const studentSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
});

// Create the model
const Student = mongoose.model('Student', studentSchema);  

module.exports=Student; 