const mongoose=require("mongoose")
const {Schema}=mongoose
const bcrypt=require("bcrypt")
const JWT = require("jsonwebtoken")


const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"user name is Required"],
        minLength:[5,"Name must be atleast 5 characters"],
        maxLength:[50,"Name must be less than 50 characters"],
        trim:true
    },
    username : {
    type:String,
       required:true,
       unique:[true,"already in use"],
       minLength:[5,"Userame must be atleast 5 characters"],
        maxLength:[50,"UserAme must be less than 50 characters"],
        trim:true
    },
    email : {
        type:String,
        required:[true,"user email is required"],
        unique:[true,"already registered"],
        lowercase:true,
    },
    password : {
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password must be alteast 8 characters"],
        select:false
    },
    bio : {
        type:String,
        required:[true,"User bio is required"],
        minLength:[10,"Bio must be alteast 10 characters"],
    }
   
},{
    timestamps:true
})

//Hashes password before saving to database
userSchema.pre("save",async function(next){
    //if password is not modified then do not hash it
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    return next()
})

//custom method to generate token
userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id:this._id,username:this.username},
            process.env.SECRET,
            {expiresIn:"24h"}
        )
    }
}

const userModel = mongoose.model("user",userSchema)

module.exports=userModel
