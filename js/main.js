const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const namecity = document.querySelector('#city');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (namecity.value === '') {
    showError('El campo es requerido');
    return;
  }

  consultAPI(namecity.value);

})

function consultAPI(city) {
  const url = `https://v1.nocodeapi.com/parsec/ow/FzhpFCyDaaKWMrrt/byCityName?q=${city}`;

  spinner();

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.cod === '404'){
        showError('Ciudad no encontrada');
      }else{
        clear();
        showData(data);
      }
    })
    .catch(error => console.log(error));
}

function showData (w) {
  const {name,main:{temp, temp_min, temp_max}, weather:[arr]} = w;
  const degree = convertGrade(temp);
  const degree_min = convertGrade(temp_min);
  const degree_max = convertGrade(temp_max);


  const content = document.createElement('div');
  content.innerHTML = `
          <h5>Clima en ${name}</h5>
          <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
          <h2>${degree}°C</h2>
          <p>Max: ${degree_min}°C</p>
          <p>Min: ${degree_max}°C</p>
  `
  result.appendChild(content);

}

function convertGrade(temp){
  return parseInt(temp - 273.15);
}

function clear(){
  result.innerHTML = '';
}

function showError(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  p.classList.add('error');
  form.appendChild(p);
  setTimeout(() => {
    p.remove();
  }, 2000);
}

function spinner(){
  clear();
  const spinner = document.createElement('div');
  spinner.classList.add('sk-circle');
  spinner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
  `
  result.appendChild(spinner);
}