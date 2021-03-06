const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const port = process.env.PORT || 3000
const app=express()
app.set('views',path.join(__dirname,'../templates/views'))
app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))


hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please Enter an address!"
        })
    }
    geocode.geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error,
            })
        }
        forecast.forecast(latitude,longitude,(error,forecastData={})=>{
            if(error){
                return res.send({
                    error:error,
                })
            }
            res.send({
                location:location,
                forecast:forecastData,
                address:req.query.address,
            })
            
            })
        
    })
 
})

app.get('',(req,res)=>{
    res.render('index',{
       title:'Weather',
       name:'Gokul srinath'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
       title:'About',
       name:'Gokul srinath'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title:'Help page',
       name:'Gokul srinath',
       ph:9876543210,
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'Help article Page not Found',
        name:"Gokul srinath"
})
})

app.get('*',(req,res)=>{
    res.render('404',
    {   title:'404',
        msg:'Page not Found',
        name:'Gokul srinath'
    })
})

app.listen(port,()=>{
    console.log("Server is on port "+port)
})