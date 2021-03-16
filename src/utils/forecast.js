const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=221cf41d04dec5d96aa74e9416e9021c&query='+longitude+','+latitude

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to service', undefined)
        } else if(body.error){
            callback('Not able to find location', undefined)
        } else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports = forecast