const express = require('express');
const router = express.Router();
const {User,Game,Note} = require('../models');

router.get("/",(req,res)=>{
    Game.findAll().then(games=>{
        res.json(games)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})
router.get("/:id",(req,res)=>{
    Game.findByPk(req.params.id,{
        include:[Note]
    }).then(game=>{
        if(!game) {
            return res.status(404).json({msg:"no record found!"})
        }
        res.json(game)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.post("/",(req,res)=>{
    //TODO: protecc route, get UserId from token
    Game.create(req.body).then(newGame=>{
        res.json(newGame)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.put("/:id",(req,res)=>{
     //TODO: protecc route, get UserId from token, ensure belongs to logged in user
     Game.update(req.body,{
         where:{
             id:req.params.id
         }
     }).then(updatedGame=>{
        if(!updatedGame[0]){
            return res.status(404).json({msg:"no such game"})
        }
        res.json(updatedGame)
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

router.delete("/:id",(req,res)=>{
    //TODO: protecc route, ensure is logged in users
    Game.destroy({
        where:{
            id:req.params.id
        }
    }).then(delGame=>{
        if(!delGame){
            return res.status(404).json({msg:"no such game"})
        }
        res.json(delGame)
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    })
})

module.exports = router;