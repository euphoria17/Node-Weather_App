const request = require('request')

const forecast = (latitude, longitude , callback ) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=89fcfc131cadbbaf280be668aa6f47f7'

    request ({ url , json:true } , (error, response) => {
        if(error) {
            callback('Unable to connect to weather report!', undefined)
        }else {
            callback(undefined ,'The overall weather description of the area is :'+ response.body.weather[0].description+'. The temp is '+ response.body.main.temp +'out there! .\t The minimum temp is : ' + response.body.main.temp_min + '. \n The maximum temp is : ' + response.body.main.temp_max )
        }
    })

}

module.exports = forecast