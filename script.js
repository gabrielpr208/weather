document.querySelector('.search').addEventListener('submit', async (event)=>{
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input != ''){
        clearInfo();
        showWarning("Loading...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=(api_code)&units=metric`;
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod == 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temperature: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }
        else{
            clearInfo();
            showWarning("Location not found.");
        }
    }
    else{
        clearInfo();
    }
});


function clearInfo(){
    showWarning('');
    document.querySelector('.result').style.display = 'none';
}

function showWarning(message){
    document.querySelector('.warning').innerHTML = message;
}

async function showInfo(json){
    showWarning('');
    document.querySelector('.result').style.display = 'block';
    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temperature} <sup>ºC</sup>`;
    document.querySelector('.windInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    document.querySelector('.windDot').style.transform = `rotate(${json.windAngle - 90}deg)`;
}