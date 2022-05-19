const PORT = process.env.PORT ||  8000

const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const { response } = require("express")

const app = express()

const newspapaers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au',
    },
    {
        name: 'un',
        address: 'https://www.un.org/climatechange',
        base: '',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/topic/climate-change',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
    }
]

const articles = []

newspapaers.forEach(newspapaer => {
    axios.get(newspapaer.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function (){
                const title = $(this).text().trim()
                const url = $(this).attr("href")

                articles.push({
                    title,
                    url: newspapaer.base + url,
                    source: newspapaer.name
                })
            })
        })
})

app.get("/",(req,res) => {
    res.json("Welcome");
})

app.get("/news", (req,res) => {
    res.json(articles)
})

app.get("/news/:newspaperId", (req,res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAdress = newspapaers.filter(newspapaer => newspapaer.name == newspaperId)[0].address
    const newspaperBase = newspapaers.filter(newspapaer => newspapaer.name == newspaperId)[0].base
    
    axios.get(newspaperAdress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")',html).each(function (){
                const title = $(this).text().trim()
                const url = $(this).attr("href")

                specificArticles.push({
                    title,
                    url : newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)

        }).catch(err => {
            console.log(err)
        })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
