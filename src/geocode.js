// http://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=85a0563c4d6caeccfcdadeb0f9efe5a7


////////////
// http://api.openweathermap.org/data/2.5/weather?q={place}&units=metric&appid={access_key}
///////////

const request = require('postman-request');

const geocode = (address, callBackFN) => {
    const access_key = '85a0563c4d6caeccfcdadeb0f9efe5a7';
    const geocodeURL = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${access_key}`

    request({url: geocodeURL, json: true}, (error, response, body) => {
        if (error) {
            callBackFN('Unable to find location!', undefined);
        } else {
            callBackFN(undefined, {
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                description: body.weather[0].description,
                weather: body.weather[0].main,
                humidity: body.main.humidity,
                visibility: body.visibility,
                temperature: body.main.temp,
                address: body.name
            });
        }
    })
}

// geocode('dubai', (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }    
// });

module.exports = geocode;
