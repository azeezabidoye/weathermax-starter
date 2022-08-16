// https://restcountries.com/v2/name/nigeria

//////////
// https://restcountries.com/v2/name/{country}
/////////

const request = require('postman-request');

const getCountryFlag = (country, temperature, description, address, humidity, weather, visibility, callBackFN) => {
    const countryFlagURL = `https://restcountries.com/v2/name/${country}`;

    request({url: countryFlagURL, json: true}, (error, response, body) => {
        if(error) {
            callBackFN('Unable to find country flag!', undefined);
        } else {
            callBackFN(undefined, {
                country: body[0].cioc,
                flag: body[0].flags.png,
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

// getCountryFlag('Nigeria', (error, data) => {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// });

module.exports = getCountryFlag;