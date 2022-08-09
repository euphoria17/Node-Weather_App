const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' +address+ '&limit=5&appid=89fcfc131cadbbaf280be668aa6f47f7'

    request({url , json:true}, (error , response) => {

        if(error){
            callback('Unable to connect to location services !', undefined)
        }
        

        
        else {
            callback(undefined , {
                latitude: ( response.body[0].lat),
                longitude: (response.body[0].lon),
                location :  response.body[0].name

            })
        }

    })
}

module.exports = geocode