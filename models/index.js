const User = require("./User")
const Game = require("./Game")
const Note = require("./Note")

User.hasMany(Game);
Game.belongsTo(User);

Game.hasMany(Note,{
    onDelete:"CASCADE"
});
Note.belongsTo(Game,{
    onDelete:"CASCADE"
});

User.hasMany(Note);
Note.belongsTo(User);

module.exports= {
    User,
    Game,
    Note
}