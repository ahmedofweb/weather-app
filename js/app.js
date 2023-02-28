const changeLocation = document.getElementById('change-location')
const card = document.getElementById('card')
const details = document.getElementById('details')
const weatherIcon = document.getElementById('weather-icon')
const body = document.body
const overlay = document.getElementById('overlay')


// sitega kirilganda focus inputga qoyilishi
changeLocation.city.focus()


// loader
function loader(state){
    if(state){
        overlay.classList.remove('d-none')
    }else{
        overlay.classList.add('d-none')
    }
}

// card innerHtmlining ozgarishi
const updateUI = (obhavo) =>{
    const {name , weather, main } = obhavo
    console.log('updateUI:', obhavo)
    details.innerHTML = `
    <h5 class="mb-3">${name}</h5>
    <p class="mb-3">${weather[0].main}</p>
    <div class="display-4 mb-3">
      <span>${Math.round(main.temp)}</span>
      <span>&deg;C</span>
    </div>
    `

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

    weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
}

function updateErrUI(city){
    details.innerHTML = ''
    details.innerHTML = `
    <h5 class="mb-3 color-red">Malumot topilmadi !!!</h5>
    `
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
    weatherIcon.src = './error.jpg'
}


// obhavo malumotlarini forecast.js dan olinishi
const getWeather = async (city)=>{
    const data = await getData(city)
    

    return data
}


// forma submit bolganda malumot kelishi
changeLocation.addEventListener('submit', (e) =>{
    e.preventDefault()
    const cityName = changeLocation.city.value.trim()
    changeLocation.reset()
    getWeather(cityName).then((data)=> updateUI(data)).catch((data)=> updateErrUI(data))
    
})


