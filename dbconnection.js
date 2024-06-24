const {connect}=require('mongoose');
const dbconnection= async()=>{
    try {
         await connect(`mongodb+srv://mugilaananthan:1234@cluster0.biccw59.mongodb.net/${process.env.DATABASE_NAME}`);
            console.log("Connected to the database");
        
    } catch (error) {
        console.log(error);
        console.log("Error connecting to the database");
        
    }
}

module.exports=dbconnection