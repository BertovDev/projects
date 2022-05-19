const PORT = 8080
const BASE = "https://www.bodybuilding.com"
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

const muscles = []

const exersices = []

app.get("/", (req, res) => {
    res.json("Bienvenidos a GYMAPI, /muscles , /muscles/(muscleName)")
})

app.get("/muscles", (req, res) => {
    axios.get("https://www.bodybuilding.com/exercises/finder").then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.ExCategory-formLabelLabel').each(function () {
            const name = $(this).html().trim()

            if(muscles.length < 16){
                muscles.push({
                    name,
                    url: `https://www.bodybuilding.com/exercises/finder/?muscle=${name.toLowerCase()}`
                })
            }

        })
        res.json(muscles)
    }).catch(err => { console.log(err) })
})

app.get("/muscles/:muscleName", (req, res) => {
    const muscleName = req.params.muscleName
    const pass = false
    const specificExersices = []

    axios.get(`https://www.bodybuilding.com/exercises/finder/?muscle=${muscleName}`).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.ExResult-resultsHeading a').each(function () {
            const exName = $(this).text().trim()
            const url = $(this).attr("href")
            specificExersices.push({
                exName,
                url: BASE + url,
                muscle: muscleName
            })

        })
        res.json(specificExersices)
    })

})


app.listen(PORT, () => { console.log("Listening on port 8080") })
