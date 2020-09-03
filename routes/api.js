const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=require('../models/user')
const Admin=require('../models/admin')
const Epass=require('../models/epass')
const UserEpass=require('../models/userEpass');
const jwt=require('jsonwebtoken')
const db="mongodb+srv://harish:harish1606@cluster0-1ktjl.mongodb.net/User?retryWrites=true&w=majority"

mongoose.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("Connected to mongodb");
}).catch(err=>{
    console.log(err);
})

router.get('/',function(req,res){
    res.send('From API route');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()
}

router.post('/register',function(req,res){
    let userData=req.body;
    let user=new User(userData);
    user.save(function(err,registeredUSer){
        if (err) throw err;
        let payload={subject:registeredUSer._id}
        let token=jwt.sign(payload,'secretKey')
        res.status(200).send({token})
    })
})

router.post('/login',function(req,res){
    let userData=req.body;
    User.findOne({email:userData.email},function(err,user){
        if (err) throw err;
        if(!user){
            res.status(401).send('Invalid email');
        }
        else{
            if(user.password !== userData.password){
                res.status(401).send('Invalid password');
            }
            else{
                let payload={subject:user._id}
                let token=jwt.sign(payload,'secretKey')
                res.status(200).send({token});
            }
        }
    })
})

router.post('/registerAdmin',function(req,res){
    let userData=req.body;
    let admin=new Admin(userData);
    admin.save(function(err,registeredUSer){
        if (err) throw err;
        let payload={subject:registeredUSer._id}
        let token=jwt.sign(payload,'secretKey')
        res.status(200).send({token})
    })
})

router.post('/loginAdmin',function(req,res){
    let userData=req.body;
    Admin.findOne({email:userData.email},function(err,user){
        if (err) throw err;
        if(!user){
            res.status(401).send('Invalid email');
        }
        else{
            if(user.password !== userData.password){
                res.status(401).send('Invalid password');
            }
            else{
                let payload={subject:user._id}
                let token=jwt.sign(payload,'secretKey')
                res.status(200).send({token});
            }
        }
    })
})

router.post('/postEpass',function(req,res){
    let userData=req.body;
    let epass=new Epass(userData);
    epass.save(function(err,registeredUSer){
        if (err) throw err;
        res.status(200).send(registeredUSer);
    })
})

router.get('/getEpass',function(req,res){
    Epass.find(function(err,data){
        if (err) throw err;
        res.status(200).send(data);
    })
})

router.delete('/deleteEpass/:id',(req,res,next)=>{
    Epass.remove({_id:req.params.id},function(err,result){
        if (err) throw err;
        res.status(200).send(result);
    })
})

router.post('/userEpass',function(req,res){
    let userData=req.body;
    let epass=new UserEpass(userData);
    epass.save(function(err,registeredUSer){
        if (err) throw err;
        res.status(200).send(registeredUSer);
    })
})
module.exports=router;