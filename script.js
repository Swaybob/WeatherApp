let body = document.getElementsByTagName('body')[0]
let searchBtn = document.getElementById('search-btn')
let main = document.getElementsByTagName('main')[0]
let form = document.getElementById('search-form')
const d = new Date()
let hour = d.getHours()

let weatherData = []

let key = "ace2f195e979e7ad696cd94f6dcc6482"

function changeBackground() {
    if (d > 18 || d < 6) {
        body.style.backgroundColor = 'rgb(4, 9, 20)'
        body.style.color = 'white'
        form.style.color = 'white'
    }
}
changeBackground()
async function fetchAPI(url) {
    console.log(url)
    try {
        let response = await fetch(url, {
            method: 'GET'
        })
        let data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        throw error
    }
}

async function displayResults(e) {

    e.preventDefault()
    let searchValue = document.getElementById('search-box').value
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&appid=${key}`
    let geoDataResponse = await fetchAPI(url)

    console.log(geoDataResponse)
    console.log
    let long = geoDataResponse[0].lon
    let lat = geoDataResponse[0].lat
    let currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`
    let curentDataResponse = await fetchAPI(currentWeatherUrl)

    let currentDetail = document.createElement('div')
    currentDetail.setAttribute('id', 'currentDetail')
    currentDetail.innerHTML = ''
    main.appendChild(currentDetail)

    currentDetail.innerHTML = `
       <div>
             <h1> ${curentDataResponse.name} </h1> <br>
        <span> ${curentDataResponse.main.temp}deg Celsius</span> <br>
        Condition : ${curentDataResponse.weather[0].main} <br><br>
        ${curentDataResponse.weather[0].description}
        </h2>
       </div>
        <table>
        <tr>
        <td>Wind</td>
        <td>${curentDataResponse.wind.speed}km/h</td>
        </tr><hr>
        <tr>
        <td>Wind Gusts</td>
        <td>${curentDataResponse.wind.gust} km/h</td>
        </tr><hr>
        <tr>
        <td>Humidity</td>
        <td>${curentDataResponse.main.humidity}%</td>
        </tr><hr>
        <tr>
        <td>Pressure</td>
        <td>${curentDataResponse.main.pressure} mb</td>
        </tr><hr>
        <tr>
        <td>Visibility</td>
        <td>${curentDataResponse.visibility} km</td>
        </tr><hr>
        <tr>
        <td>Cloud Cover</td>
        <td>${curentDataResponse.clouds.all}%</td>
        </tr><hr>
        </table>
        ` ;


}

form.addEventListener('submit', displayResults)
