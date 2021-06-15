const express = require('express');
const mongoose = require('mongoose');
const Data = require('./module/emailschema');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
const dbUri = 'mongodb+srv://<username>:<password>@cluster0.4yhpu.mongodb.net/Node-data?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
console.log('connected to db');
})
.catch((err)=>{
console.log(err);
})
app.set('view engine', 'ejs');



app.get('/signup', async (req,res)=>{
   const email = req.body.email;
   const usedemail = await Data.findOne({email});
   if(!usedemail) {
     const data = new Data(req.body);
   data.save()
   .then((result)=>{
   res.redirect('/');
   })
   .catch((err)=>{
       console.log(err);
   })
   }
   else{
       res.send("Email ID is already exist");
   }
   });