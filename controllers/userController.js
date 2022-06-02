const express = require('express');
const router = express.Router();
const {User,Game,Note} = require('../models');

router.get("/",(req,res)=>{
    User.findAll().then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})
router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Game,Note]
    }).then(user=>{
        if(!user) {
            return res.status(404).json({msg:"no record found!"})
        }
        res.json(user)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.post("/",(req,res)=>{
    //TODO: generate token
    User.create(req.body).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

//TODO: login route

module.exports = router;