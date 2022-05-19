const mongoose = require("mongoose");

const pokeTeamSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    numberId: {
        type:Number,
        required:true
    },
    pokeType: {
        type:[String],
        required:true
    },
    pokeImg: {
        type:String,
        required:true
    }
},{collection:"poketeams2"});

const PokeTeam = mongoose.model("PokeTeam",pokeTeamSchema);

module.exports = PokeTeam;

