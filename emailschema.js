const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const bcrypt= require('bcryptjs');
const db=new Schema({ 
   email :{type:String, required:true},
password:{type:String, required:true}
});
 
db.pre("save", async function(next) {
    if(this.isModified("password"))
    {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`);
}
    next();
})


const Data= mongoose.model('Data',db);
module.exports=Data;
