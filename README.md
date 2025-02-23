# Weather App

### The most Beautiful Weather App (Made using React.js, Tailwind CSS and Ant Design)

## APIs used
* OpenWeather: [https://openweathermap.org/api](https://openweathermap.org/api) (for Weather info)
* Geoapify: [https://www.geoapify.com/geocoding-api](https://www.geoapify.com/geocoding-api) (for Geocoding)

## Live Link
### This Project is deployed at: [https://weather-harshpx.vercel.app](https://weather-harshpx.vercel.app)

## To run locally (must have Node.js and NPM installed)
1. Clone this project on your local device & install necessary packages
```
git clone 'https://github.com/harshpx/weather.git'
cd weather
npm i
```
2. Get your 'Openweather' and 'Geoapify' API keys, then create '.env' file & add your API keys there.
```
#inside .env file

VITE_GEOCODING_API_KEY=""
VITE_OPENWEATHER_API_KEY=""
```
3. Run the App
```
npm run dev
```

## Features
* Most beautiful UI that I've ever made
* Dark and Light modes
* Responsive UI (looks good on all screen sizes)
* Celsius and Fahrenheit Units
* 5 Day Weather forecast 
* Efficient API handeling
* Industry standard code structure

## Screenshots
<div style="display:flex; flex-direction:column; gap:50px">
    <div style="display:flex; flex-direction:column; gap:10px">
        <span style="font-size:18px;">Mobiles</span>
        <div style="display:flex; gap:10px">
            <img src="./src/assets/screenshots/ss5.png" style="width:46%; height:46%"/>
            <img src="./src/assets/screenshots/ss6.png" style="width:46%; height:46%"/>
        </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px">
        <span style="font-size:18px;">Tablets</span>
        <img src="./src/assets/screenshots/ss3.png"/>
        <img src="./src/assets/screenshots/ss4.png"/>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px">
        <span style="font-size:18px;">Desktops</span>
        <img src="./src/assets/screenshots/ss1.png"/>
        <img src="./src/assets/screenshots/ss2.png"/>
    </div>
</div>