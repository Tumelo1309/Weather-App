require('dotenv').config();
const readline = require("readline");
const sApiKey = process.env.API_KEY;

//requesting user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a city: ', sCity => {
    if (!sCity) errorDisplay("You have entered an invalid input");
    else {
        getData(`https://api.openweathermap.org/data/2.5/weather?q=${sCity}&appid=${sApiKey}&units=metric`);
    }
    rl.close();
});

async function getData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.log("City does not exist!!");
    }
}

function displayData(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description }] } = data;
    console.log(`\nThe weather in ${city}:\nTemperature: ${temp}°C\nHumidity: ${humidity}%\nDescription: ${description}`);
}

function errorDisplay(sMessage) {
    console.log(sMessage);
}