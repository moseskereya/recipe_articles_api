const port = 8000;
const express = require('express')
const cheerio = require('cheerio');
const axios = require('axios');
const { response } = require('express');
const artiles = []

const app = express();

app.get('/', (req, res) => {
    res.json("Hello from here")
})

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/food')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            $('a:contains("recipe")', html).each(function (){
                const title = $(this).text()
                const url = $(this).attr('href')
                const img = $(this).attr('src')
                artiles.push({
                    title,
                    url,
                    img
                })
            })
            res.json(artiles);
        }).catch((err) => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})


