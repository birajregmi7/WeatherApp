let country = 'Mumbai'
let containerInfo = document.querySelector('.sub-container-two')
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
let appId = '55b2289d655aaab706595661745aa638'
let btn = document.querySelector('.btn')
btn.addEventListener('click', async function () {
    let inp = document.querySelector('.inp').value
    console.log(inp)
    let wethArr = await weatherSearch(inp);
    show(wethArr)
})
function show(wethArr) {
    const weatherMain = wethArr.weather[0].main
    let desc = document.querySelector('.description')
    let temp = document.querySelector('.temperature')
    let city = document.querySelector('.city')
    let humidity = document.querySelector('.humidity')
    let windspeed = document.querySelector('.windspeed')
    let images = document.querySelector('.images');


    desc.innerText = `${wethArr.weather[0].description}`;
    temp.innerText = `${wethArr.main.temp}°C`;
    city.innerText = `${wethArr.name}`;
    humidity.innerText = ` ${wethArr.main.humidity}%`;
    windspeed.innerHTML = `    ${wethArr.wind.speed}km/h`;

    if(weatherMain == 'Clouds'){
        images.setAttribute('src','cloudy.png')
    }else if(weatherMain=='Clear'){
        images.setAttribute('src','sun.png')
    }else if(weatherMain=='Rain'){
        images.setAttribute('src','raining.png')
    }else if(weatherMain=='Drizzle'){
        images.setAttribute('src','raining.png')
    }else if(weatherMain=='Mist'){
        images.setAttribute('src','fog.png')
    }else if(weatherMain=='Haze'){
        images.setAttribute('src','haze.png')
    }
        containerInfo.classList.remove('sub-container-two')
        containerInfo.classList.add('sub-container')
}

async function weatherSearch(country) {
    try {
        let res = await axios.get(url + country + `&appid=${appId}`)
        return res.data;
   
    } catch (e) {
        if (e.response) {
            if (e.response.status === 404) {
                // Display an error message to the user
                alert('City not found. Please enter a valid city name.');
            } else {
                // Display a generic error message
                alert('An error occurred while fetching weather data.');
            }
        } else {
            // Display a generic error message if no response is received
            alert('An error occurred while fetching weather data.');
        }
        // You can also log the error for debugging purposes
        console.error('Error:', e);
    }
}