const bcrypt = require('bcryptjs');
const User=require('../Models/User')
require('dotenv').config();

const index=(req,res)=>{
    res.render('index')
}
const register=(async(req,res)=>{
    const {email,password}=req.body
   if(!email||!password){
       res.send('Invalid request body')
       return
   }
   try {
    const existinguser=await User.findOne({email})
    if(existinguser){
        res.send('User already exist')
        return
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const user=new User({email,password:hashedpassword})
    await user.save()
    req.session.user = { id: user._id, email: user.email };
    res.send(`user registred successfully, with id ${user._id} you can proceed to login`)
   } catch (error) {
    res.send(error.message)
   }
})

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send('Invalid request body');
        return;
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.send('Authentication failed! Check email and password.');
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.send('Authentication failed! Check email and password.');
            return;
        }

        req.session.user = { id: user._id, email: user.email };
        res.send(`User logged in successfully with ID ${user._id}`);
    } catch (error) {
        res.send('An error occurred during authentication.');
    }
};



const logout=(async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logout successful');
    })
})

module.exports={index,register,login,logout}