const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:String,
    username:String,
    date:String
});
module.exports=mongoose.model('userEpass',userSchema,'userEpass');
