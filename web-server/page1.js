
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = (__dirname)

// const partialsPath = (__dirname)
// console.log(__dirname)

app.set('view engine', 'hbs')
hbs.registerPartials(publicDirectoryPath)

app.use(express.static(publicDirectoryPath ))

app.get('', (req, res) =>{
    res.render('index' , {
        title: 'Weather App',
        name: 'Atmaja Mali'
    })

})

app.get('/about' , (req , res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Atmaja Mali'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helptext: 'Please refer to the search engine on your device :(',
        title: 'Help',
        name: 'Atmaja Mali'
    })
})



app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({
            error:'You must provide a address search term !'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location = {}}) => {
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude, longitude , (error,forecastdata) => {
            if(error)
            {
                return res.send({error})


            }

            res.send({
                forecast: forecastdata ,
                location,
                address: req.query.address
        })

       
        })

    })

    // console.log(req,query.search)
    //  res.send( {
    //     forecast : "Today's Forecast",
    //     location : "Your location"
    // })
})











//* ->indicates that this properties are  applicable to all pages other then the ones whoose paths are mentioned.
// this part is placed last exclusively as the express responds to the req line-by-line 
app.get('*',(req , res) => {
    res.send('404 NOT FOUND ')

})

app.listen(port , () => {
    console.log('Server is up on port .' + port)
})