const {User,Game,Note} = require("../models");
const sequelize = require("../config/connection.js")

const users = [
    {
        username:"joejoejoe",
        password:"password"
    },
    {
        username:"theCats",
        password:"meowmeow"
    }
]

const games = [
    {
        title:"Splendor",
        description:"Gems, set collection, poker chips",
        playerCount:4,
        weight:1.5,
        UserId:1
    },
    {
        title:"Kanban",
        description:"Making cars, with kanban",
        playerCount:4,
        weight:4.0,
        UserId:1
    },
    {
        title:"The Isle Of Cats",
        UserId:2
    }
]

const notes = [
    {
        note:"i love cars",
        GameId:2,
        UserId:1
    },
    {
        note:"boo to cars",
        GameId:2,
        UserId:1
    }
]

const seedIt = async ()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(users,{
        individualHooks:true
    })
    await Game.bulkCreate(games);
    await Note.bulkCreate(notes);
    console.log("seeded!")
    process.exit(0)
}

seedIt();