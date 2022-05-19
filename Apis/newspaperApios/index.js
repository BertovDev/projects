const PORT = 8080

const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();

const articles = []

const newspapers = [
    {    
        name: "ole",
        url: "https://www.ole.com.ar/messi/",
        base: "https://www.ole.com.ar",
        country: "Argentina"
    },
    {    
        name: "Marca",
        url: "https://cgi.marca.com/buscador/archivo_marca.html?q=messi",
        base: "",
        country: "España"
    },
    {    
        name: "Record",
        url: "https://www.record.com.mx/search/site/messi",
        base: "",
        country: "Mexico"
    },
    {
        name: "El periodico deportivo",
        url: "http://www.elperiodicodeportivo.com.co/search/node?keys=messi",
        base: "",
        country: "Colombia"
    },
    {
        name: "Líbero",
        url: "https://libero.pe/tag/lionel-messi",
        base: "https://libero.pe",
        country: "Perú"
    },
    {
        name: "Meridiano",
        url: "https://meridiano.net/buscador.php?q=messi",
        base: "",
        country: "Venezuela"
    },
]

newspapers.forEach(newspaper => {
    axios.get(newspaper.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Messi")',html).each(function(){
                const title = $(this).text()
                const url = $(this).attr("href")

                articles.push({
                    title,
                    url: newspaper.base + url,
                    country: newspaper.country
                })
            })
        }).catch(err => {console.log(err)})
});

app.get("/",(req,res) => {
    res.json("Welcome to the newspaper api")
})

app.get("/messi",(req,res) => {
    res.json(articles)
})


app.listen(PORT , () => console.log(`Listening on port ${PORT}`))


const checkBase = (base,url) => {
    let completeUrl = ""
    if(url.includes(base)){
        completeUrl = url
    } else {
        completeUrl = base + url
    }
    return completeUrl
}
