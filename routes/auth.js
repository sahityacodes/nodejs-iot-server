const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');

  router.get('/', async(req,res)=>{
      res.send("Get response");
  })
  
  router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in database.
    const emailExist = await User.findOne({email:req.body.email})
    if (emailExist) return res.status(400).send('Email already exists.');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        contactNo: req.body.contactNo
    });
    try{
        const savedUSer = await user.save();
        res.send(savedUSer);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => { 

    const {error} = loginValidation(req.body);
    if(error) 
    return res.status(400).send({result:error.details[0].message});

    //Checking if the user is already in database.
    const user = await User.findOne({email:req.body.email});
    if (!user) 
        return res.status(400).send({result:'Email or password is wrong.'});

    const validPass = await  bcrypt.compare(req.body.password, user.password);
    if(!validPass)
        return res.status(400).send('Invalid password');

        if(res.statusCode !== 400){
            console.log("Authentication successful");
            return res.send({result:"Success"});
        }
});

module.exports = router;
