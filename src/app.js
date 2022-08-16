const path = require('path');
const express = require('express');
const geocode = require('./geocode');
const getCountry = require('./country');
const getCountryFlag = require('./countryflag');


const app = express();
const port = process.env.PORT || 1999;
app.set('view engine', 'hbs');

const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
app.set('views', viewsPath);
app.use(express.static(pubDir));


app.get('/', (req, res) => {
    // res.send('<h1>homepage</h1>');
    res.render('index');
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send('Invalid address...input a correct location!')
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            console.log(error);
        } else {
    
            getCountry(data.latitude, data.longitude, data.temperature, data.description, data.address, data.humidity, data.weather, data.visibility, (error, data) => {
                if(error) {
                    console.log(error);
                } else {
    
                    getCountryFlag(data.country, data.temperature, data.description, data.address, data.humidity, data.weather, data.visibility, (error, data) => {
                        if(error) {
                            console.log(error);
                        } else {
                            res.json({
                                country: data.country,
                                temperature: data.temperature,
                                description: data.description,
                                address: data.address,
                                flag: data.flag,
                                humidity: data.humidity,
                                weather: data.weather,
                                visibility: data.visibility
                            })
                            console.log(data);
                        }
                    });
                }
            });
        }    
    });
});

app.get('*', (req, res) => {
    res.send('<h1>Error: Page 404</h1>')
})





app.listen(port, () => console.log(`Application is running on ${port}`));