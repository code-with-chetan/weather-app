let cityName=document.querySelector(".main_heading");
let getDateTime=document.querySelector(".DataTime_para");
let getWeatherData=document.querySelector(".weather_condition");
let getLogo=document.querySelector(".climate_logo");
let getTemperature=document.querySelector(".current_temp");
let getMinTemperature=document.querySelector(".min_temp");
let getMaxTemperature=document.querySelector(".max_temp");
let getWeatherFeel=document.querySelector(".weather_feel");
let getWeatherHumidity=document.querySelector(".weather_Humidity");
let getWeatherWind=document.querySelector(".weather_wind");
let getWeatherPressure=document.querySelector(".weather_Pressure");

//Searching functionality
let nameOfCit="Surkhet";

document.querySelector(".search_bar").addEventListener("submit",(e)=>{
                        e.preventDefault();
                  const getCity=document.querySelector(".search_input");
                  nameOfCit=getCity.value;
                  getDataFromApi();
                  getCity.value="";                
});

const getCountryCode=(code)=>{
    return new Intl.DisplayNames(["en-US"], { type: "region" }).of(code);
};


//this function handle timezone dynamically for different city.
const getTimeZoneFromOffset = (offset) => {
    const localDate = new Date(Date.UTC(1970, 0, 1) + offset * 1000);
    return Intl.DateTimeFormat("en-US", { timeZone: "UTC" })
        .resolvedOptions().timeZone;
};

const getDataOfDate = (dt, offset) => {
    const localDate = new Date((dt + offset) * 1000);//add two time(UTC+timezone=seconds) convert this
    //seconds into milliseconds by multiplying with 1000.
    const timeZone = getTimeZoneFromOffset(offset);//call the function for the dynamically handle the time
    //zone i mean the time zone for selected or provide city.
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        timeZone: timeZone, 
    }).format(localDate);
};


const getDataFromApi=async()=>{
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${nameOfCit}&appid=9dd30291030063350573f7558e294b73`;
    try {
        const response=await fetch(apiUrl);
        const data=await response.json();
        const{main,sys,weather,wind,dt,name,timezone}=data;
        cityName.innerHTML=`${name},${getCountryCode(sys.country)}`;
        getDateTime.innerHTML = getDataOfDate(dt, timezone);
        getWeatherData.innerHTML=`${weather[0].main}`;
        getLogo.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        getTemperature.innerHTML=`${main.temp}&#176`;
        getMinTemperature.innerHTML=`Min: ${main.temp_min.toFixed()}`;
        getMaxTemperature.innerHTML=`Max: ${main.temp_max.toFixed()}`;
        getWeatherFeel.innerHTML=`${main.feels_like}&#176`;
        getWeatherHumidity.innerHTML=`${main.humidity}%`;
        getWeatherWind.innerHTML=`${wind.speed}m/s`;
        getWeatherPressure.innerHTML=`${main.pressure}hPa`;
        console.log(data);
    } catch (error) {
        console.log(error);
        
    }
};

window.addEventListener("load",getDataFromApi);


