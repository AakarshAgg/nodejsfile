const loginDataValidate=(req,res,next)=>{
    const {username,password}=req.body;

    //return error message if password and email missing

    if(!username || !password){
        return res.status(400).json({
            success:false,
            message:"Username and password are required"
        });
    }
    next()
}

module.exports=loginDataValidate