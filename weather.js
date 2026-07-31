// Left Section Working

//This function just places the name of place 
const locationPara=document.getElementById("location-para");
const inputLocation=document.getElementById("input-location");
const searchbutton=document.getElementById("search-btn");
 showlocation=()=>{
    const city=inputLocation.value.trim();
    if(city===""){
        locationPara.textContent="";
        return;
    }
    else{
        locationPara.textContent=city;
        getWeather(city);
       
        getforecastWeather(city);
    }
}
searchbutton.addEventListener("click",()=>{
    console.log("Button CLicked");
    showlocation();
    getforecastWeather(city);
   
});
const temp=document.getElementById("temprature");
const img=document.getElementById("weather-icon");
const condition=document.getElementById("weather-condition");
const date=document.getElementById("today-date");
const cityname=document.getElementById("city-name");
const humid=document.getElementById("humidity");
const WindSpeed=document.getElementById("wind-speed");
const visibility=document.getElementById("visibility");
const UV=document.getElementById("uv-index");
//APIs Working Starting From Here
const API_Key="b659b8fe6850443fac5132306262907";
const Base_URL="https://api.weatherapi.com/v1/current.json";
// Forecast API
const Forecast_URL = "https://api.weatherapi.com/v1/forecast.json";
//Functions
async function getWeather(city){
console.log(city);
//API URL
const URL=`${Base_URL}?key=${API_Key}&q=${city}`;
const response=await fetch(URL);
const data=await response.json();
console.log(data);
todayTemprature(data);
} 
todayTemprature=(data)=>{
  temp.textContent=`${data.current.temp_c}°C`;
  img.src="https:"+data.current.condition.icon;
  condition.textContent=data.current.condition.text;
  date.textContent=data.current.last_updated;
  cityname.textContent=`${data.location.name},${data.location.country}`;
  humid.innerHTML=`Humidity:${data.current.humidity}%`;
  WindSpeed.innerHTML=`Wind Speed:${data.current.wind_kph}kph`;
  visibility.innerHTML=`Visibility:${data.current.vis_km}km`;
  UV.innerHTML="UV Index:"+data.current.uv;
}
async function getforecastWeather(city){
    const forecast_URL=`${Forecast_URL}?key=${API_Key}&q=${city}&days=7`;
    const forecast_response=await fetch(forecast_URL);
    const data=await forecast_response.json();
    console.log(data);
    console.log(data.forecast.forecastday[0]);
    const WeatherContainer=document.getElementById("daily-weather-cards");
    WeatherContainer.innerHTML="";
    for(let i=0;i<=6;i++){
    const today=data.forecast.forecastday[i];
    //Creating Cards By Using JS In Html
    const card=document.createElement("article");
    card.className="daily-weather-card";
    card.innerHTML=`<h3>${today.date}</h3>
        <img src="https:${today.day.condition.icon}" alt="Weather-Icon">
        <p>${today.day.maxtemp_c}°C</p>
        <p>${today.day.mintemp_c}°C</p> `
    WeatherContainer.appendChild(card);
    }
}
