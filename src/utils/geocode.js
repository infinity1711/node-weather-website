const request = require('request')
const mapboxToken = "pk.eyJ1IjoiaGlyYW5tYXkiLCJhIjoiY2p4NXBwdTgxMDAzNjQ5czlpdXJqZ2gyMCJ9.utn0HTFjXVAoPj1EtNtfeA";
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + mapboxToken;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to reach location services! Please try later.', undefined)
        }
        else if (body.message) {
            callback(res.body.message, undefined)
        }
        else if (body.features.length === 0) {
            callback('No result found', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
