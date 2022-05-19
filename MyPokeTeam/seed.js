const mongoose = require("mongoose");
const PokeTeam = require("./models/myTeam")

mongoose.connect('mongodb://localhost:27017/myPokeTeam', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Conecction open!");
    })
    .catch(err => {
        console.log("Mongo Connection ERROR! :(");
        console.log(err);
    })

const seedTeam = [
    {
        name:"charizard",
        numberId:6,
        pokeType: ["fire","flying"],
        pokeImg:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    }
]  

PokeTeam.create(seedTeam)
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log(e);
    })