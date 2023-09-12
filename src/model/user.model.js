const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
    
})

module.exports = mongoose.model('User',UserSchema);