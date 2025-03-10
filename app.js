const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "6a4f7f318f81c0d09e34325472acadf1#"; 
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units="+unit+"&appid="+apiKey;

    https.get(url, function(response){
        console. log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imagUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The Temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
            res.write("<h1>The Weather is currently "+description+".</h1>");
            res.write("<img src="+imagUrl+">"); 
            res.send();
        });

    });
});

app.listen(3000, function() {
    console. log("Serveris running on port 3000!.")
});