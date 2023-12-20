const emailValidator=require("email-validator")

const signupDataValidate=(req,res,next)=>{
    const {name,username,email,password,bio}=req.body;
    console.log(name,username,email,password,bio)

    ///every field is required
    if(!name || !username || !email ||!password ||!bio){
        return res.status(400).json({
            success:false,
            message:"Every field is required"
        })
    }

    //email validator using npm package 

    const validEmail=emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"Please provide a valid email address"
        })
    }
    next()
}

module.exports=signupDataValidate;