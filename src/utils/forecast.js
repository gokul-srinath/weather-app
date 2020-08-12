
const request=require('request')



const forecast=(lat,long,callback)=>{
    const url= "http://api.weatherstack.com/current?access_key=be9d941b875bffe09f359450ef2ee5c5&query="+String(lat)+','+String(long)
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to weather stack!",undefined)
        }
        else if(body.message==="Not Found"){
            callback("please enter valid co-ordinates!",undefined)
        }
        else{
            callback(undefined,("The weather is "+body.current.weather_descriptions[0]+ " and the temperature is "+body.current.temperature
    ))
        }
    })
}


module.exports={
    forecast:forecast,
}