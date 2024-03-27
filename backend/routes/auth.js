const express=require('express');
const User=require('../modules/User');
const router=express.Router();
const {body,validationResult}=require('express-validator');//1
var bcryptjs=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../fetch/Fetchuser');
const jwt_key='gayatripsk@12345';


//create user api/auth/creatuser
router.post('/createuser',
   [
      body('name','enter valid name').isLength({min:3}),
      body('email','enter valid emailid').isEmail(),
      body('password','enter password has min length is 8').isLength({min:8}),
   ],
  async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
      return res.status(404).json({errors:errors.array()});
   }

   var user= await User.findOne({email:req.body.email});
   if(user)
   {
      success=false;
      return res.status(404).json({error:"sorry already exisit"})
   }
   const salt=await bcryptjs.genSalt(10);
   secPass=await bcryptjs.hash(req.body.password,salt);

     user=await User.create({
         name:req.body.name,
         email:req.body.email,
         password:secPass,
      })
     const data={
      user:{
         id:user.id
      }
     }
     const authtoken=jwt.sign(data,jwt_key);
     console.log(authtoken);
     success=true;
     res.json({ success,authtoken});

})



// login user api/auth/login

router.post('/login',
   [
      body('email','enter valid emailid').isEmail(),
      body('password','enter password has min length is 8').exists(),
   ],
  async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
      return res.status(404).json({errors:errors.array()});
   }
   const {email,password}=req.body;
   try {
      var user=await User.findOne({email});
      if(!user)
      {
         return res.status(404).json({error:'sorry user doesnot exisit'});
      }
      const pass=await bcryptjs.compare(password,user.password);
      if(!pass)
      { 
         success=false;
         return res.status(404).json({success,error:'sorry user doesnot exisit'});
      }
      const data={
         user:{
            id:user.id
         }
      }
      const authtoken=jwt.sign(data,jwt_key);
      success=true;
      res.json({ success,authtoken});

      
   } catch (error) {
      console.log(error.message);
      res.status(500).send('internal server error');
   }
  })



  //get user api/auth/getuser

  router.post('/getuser',fetchuser, async(req,res)=>{
   try {
      userId=req.user.id;
      const user=await User.findById(userId)
      res.send(user)
   } catch (error) {
      console.log(error.message);
      res.status(400).send('internal server error')
   }
})

module.exports=router