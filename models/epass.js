const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const userSchema=new Schema({
    district:String
});
module.exports=mongoose.model('epass',userSchema,'epass');
