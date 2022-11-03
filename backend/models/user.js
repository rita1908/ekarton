const mongoose=require("mongoose")

const doctorSchema=new mongoose.Schema({
    doctorId:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    fullName:{
        type:String,
        require:true
    },
    specilazation:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
   

});
mongoose.model("Doctor",doctorSchema)