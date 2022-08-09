const request = require('request')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const address = process.argv[2]

if(!address) {
    console.log('Please provide an address')
} else {
    geocode (address , (error,{latitude , longitude , location}) => {
        if(error)
        {
            return console.log(error)
        }
        
            forecast(latitude ,longitude, (error,forecastData) =>{
              if(error) {
                  return console.log(error)
              }
        
              console.log(location)
              console.log(forecastData)
            })
        
        })
        
        
}











