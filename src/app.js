const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

/* Define Path for express config */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/* setup handlebars engine and view location */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/* Setup static directory to serve */
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hiranmay'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Hiranmay'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Hiranmay',
        message: 'For any query contact Hiranmay.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            res.send({ error })
        }
        else {
            forecast(data.lat, data.lng, (err, data) => {
                if (err) res.send({ error: error })
                else {
                    res.send({
                        forecast: data.forecast,
                        address: req.query.address,
                        location: data.location
                    })
                }
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hiranmay',
        errorMessage: 'Help Page Article Not Found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hiranmay',
        errorMessage: 'Page Not Found'
    })
})
app.listen(port, () => {
    console.log('Server is up on post ' + port)
})