const express = require('express');
const router = express.Router();
const {User,Game,Note} = require('../models');
const {withAuth} = require("../utils/tokenAuth")

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

router.post("/",withAuth,(req,res)=>{
    Note.create({
        note:req.body.note,
        GameId:req.body.GameId,
        UserId:req.user
    }).then(newNote=>{
        res.json(newNote)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.put("/:id",withAuth,(req,res)=>{
     Note.update(req.body,{
         where:{
             id:req.params.id,
             UserId:req.user
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

router.delete("/:id",withAuth,(req,res)=>{
    Note.destroy({
        where:{
            id:req.params.id,
            UserId:req.user
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