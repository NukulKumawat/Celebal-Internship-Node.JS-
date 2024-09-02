const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter user name'],
        length:12
    },
    email:{
        type:String,
        required:[true, 'Please enter email'],
        unique:[true,'This email has already been used']
    },
    age: {
        type: Number,
        required: true,
      },
});

const User= mongoose.model('User',UserSchema);
module.exports=User;