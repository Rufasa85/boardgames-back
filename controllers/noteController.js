const express = require('express');
const router = express.Router();
const {User,Game,Note} = require('../models');

router.get("/",(req,res)=>{
    Note.findAll().then(notes=>{
        res.json(notes)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})
router.get("/:id",(req,res)=>{
    Note.findByPk(req.params.id,{
        include:[Game,User]
    }).then(note=>{
         if(!note) {
            return res.status(404).json({msg:"no record found!"})
        }
        res.json(note)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.post("/",(req,res)=>{
    //TODO: protecc route, get UserId from token
    Note.create(req.body).then(newNote=>{
        res.json(newNote)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.put("/:id",(req,res)=>{
     //TODO: protecc route, get UserId from token, ensure belongs to logged in user
     Note.update(req.body,{
         where:{
             id:req.params.id
         }
     }).then(updatedNote=>{
        if(!updatedNote[0]){
            return res.status(404).json({msg:"no such Note"})
        }
        res.json(updatedNote)
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.delete("/:id",(req,res)=>{
    //TODO: protecc route, ensure is logged in users
    Note.destroy({
        where:{
            id:req.params.id
        }
    }).then(delNote=>{
        if(!delNote){
            return res.status(404).json({msg:"no such Note"})
        }
        res.json(delNote)
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

module.exports = router;