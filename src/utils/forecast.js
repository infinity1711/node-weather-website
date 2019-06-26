const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = "https://api.darksky.net/forecast/333e04df467f709caaae2e842ff586cd/" + lat + "," + lng;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to reach weather services!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            const currentWeather = body.currently
            const todayweather = body.daily
            callback(undefined, 
                {
                    forecast:todayweather.data[0].summary + " It is currently " + currentWeather.temperature + " degree out and " + currentWeather.precipProbability + "% chances of rain."+todayweather.summary,
                    location:body.timezone
                })
           //callback(undefined,body)
        }
    })
}

module.exports = forecast