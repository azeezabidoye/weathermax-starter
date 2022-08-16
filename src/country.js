// https://us1.locationiq.com/v1/reverse?key=pk.53d8051fc24320cb690ff81a63caac7c&lat=6.5833&lon=3.75&format=json

//////////
// https://us1.locationiq.com/v1/reverse?key={access_key}&lat={latitude}&lon={longitude}&format=json
//////////

const request = require('postman-request');
const getCountry = (latitude, longitude, temperature, description, address, humidity, weather, visibility, callBackFN) => {
    const access_key = 'pk.53d8051fc24320cb690ff81a63caac7c';
    const countryURL = `https://us1.locationiq.com/v1/reverse?key=${access_key}&lat=${latitude}&lon=${longitude}&format=json`;

    request({url: countryURL, json: true}, (error, response, body) => {
        if(error) {
            callBackFN('Unable to find country!', undefined);
        } else {
            callBackFN(undefined, {
                country: body.address.country,
                temperature,
                description,
                address,
                humidity,
                weather,
                visibility
            })
        }
    })
}

// getCountry(6.5833, 3.75, (error, data) => {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// });

module.exports = getCountry;