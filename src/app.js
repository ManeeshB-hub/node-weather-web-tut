const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Maneesh'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Maneesh'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        msg: 'This is the message'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Invalid Address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, location} ={} )=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, {temperature, feelslike, humidity})=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                temperature,
                feelslike,
                humidity,
                location
            })
        })
    })

})

app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        err: "no help article"
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        err: "404 page"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})