const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");

const axios = require("axios");
const app = express();
const path = require("path");

const PokeTeam = require("./models/myTeam")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/myPokeTeam', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Conecction open!");
    })
    .catch(err => {
        console.log("Mongo Connection ERROR! :(");
        console.log(err);
    })

let pokemons = [];



const getPokemon = async (id) => {
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data
}

const fillPokedex = async () => {
    for (let i = 1; i <= 48; i++) {
        pokemons.push(await getPokemon(i));
    }
}

const getPokeInfo = async (id) => {
    const res = await getPokemon(id);
    const resObj = {
        name:res.name,
        numberId:res.id,
        pokeType: res.types.length >= 2 ? [res.types[0].type.name , res.types[1].type.name] : [res.types[0].type.name],
        pokeImg:res.sprites.front_default
    }
    return resObj;
}

app.get("/pokedex", (req, res) => {
    res.render("pokedex", { pokemons });
})


app.get("/pokedex/team", async (req, res) => {
    const team = await PokeTeam.find({});
    res.render("team", { team });
})

app.post("/pokedex/team", async (req, res) => {
    const {pokeId} = req.body;
    const newPokeParam = await getPokeInfo(pokeId);
    const newPoke = new PokeTeam(newPokeParam);
    await newPoke.save();
    res.redirect("team");
})

app.delete("/pokedex/team", async (req,res) => {
    const {_id} = req.body;
    const delPoke = await PokeTeam.findByIdAndDelete(_id);
    console.log(`${delPoke} Deleted!`);
    res.redirect("team");

})

fillPokedex();

app.listen(8080, () => {
    console.log("Listening on port 8080");
})

