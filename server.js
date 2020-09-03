const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
var path=require('path');

const PORT=process.env.PORT || 8080;
const api=require('./routes/api');
const app=express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api',api);

app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
app.get('/',function(req,res){
    res.send('Hello from server');
})

app.listen(PORT,function(){
    console.log('Server running on localhost:'+PORT);
})