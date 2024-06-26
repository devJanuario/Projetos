document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault() // Previne o comportamento padrão de um formulário
    
    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f8b0cfdbb7892172fa7cc98f856f69a2&units=metric&lang=pt_br` // URL da requisição

        let results = await fetch(url) // Buscar e armazenar os resultados
        let json = await results.json() // Transformar os resultados em JSON

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos essa localização.')
        }
    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}