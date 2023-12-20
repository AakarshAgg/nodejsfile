
const bcrypt=require("bcrypt");
const userModel = require("../model/userSchema");


///controller for signUp
const signup=async(req,res,next)=>{
    /// userSchema "pre" middleware function for "save" will hash password using "bcrypt" (npm package) before saving the data into the database
try {
    const userInfo= new userModel(req.body);
    const result=await userInfo.save()
    return res.status(200).json({
        success:true,
        data:result
    })
} catch (error) {
    console.log(error)
    return res.status(400).json({
        message:error.message
    })
}
  

}


//controller for sign in
const signIn=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
      //check if user exist

    const user=await userModel.findOne({
        username
    }).select("+password")


    //return an error message if user is null or passsoword is incorrect

    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).json({
            success:false,
            message:"Invalid credentials"
        });
    }


  //create the JWT token using the user Schema method 

  const token=user.jwtToken();
  user.password=undefined;

  const cookieOption={
    maxAge:24*60*60*1000,//24h
    httpOnly:true
  }
  
  res.cookie("token",token,cookieOption);
  res.status(200).json({
    success:true,
    data:user,
    message:"Logged In Successfully"
  })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }

}

//getuser controller

const getUser=async(req,res,next)=>{
    const userId=req.user.id
    try{
        const user=await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            data:user
        })
    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


//controller for logout

const logout=async(req,res,next)=>{
    try {
        const cookieOption={
            expires:new Date(),
            httpOnly:true
        };
        res.cookie("token",null,cookieOption);
        res.status(200).json({
            success:true,
            message:"User Logged Out successfuly"
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={signIn,signup,getUser,logout}
