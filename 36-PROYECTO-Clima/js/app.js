const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
  formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
  e.preventDefault();

  //validar
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    //hubo un error 
    mostrarError('Ambos campos son Obligatorios');

    return;
  }

  //consultariamos la API
  consultarAPI(ciudad, pais);

}

function mostrarError(mensaje){
  const alerta = document.querySelector('.bg-red-100');

  if (!alerta) {
    //crear una alerta 
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400','text-red-700','px-4','py-3','rouden','max-w-auto','mx-auto','mt-6','text-center');

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    // se elimine la alerta despues de 3 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
    
  }  
}
function consultarAPI(ciudad, pais){
  const appId = '3d943bbd359b77472f94ad941b27bf04';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner(); //agrega el spiner antes de todo

  fetch(url)
    .then ( respuesta => respuesta.json())
    .then( datos =>{
      //limpiar html previo
      limpiarHTML();

      if (datos.cod === "404") {
        mostrarError('Ciudad no encontrada')
        return;
      }

      //imprime la respuesta en el HTML

      mostrarClima(datos);
    })
}

function mostrarClima(datos){
  const { name, main: { temp, temp_max, temp_min}} = datos;

  const centigrados = kelvinAcentigrados(temp);
  const max = kelvinAcentigrados(temp_max);
  const min = kelvinAcentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl');

  const actual = document.createElement('p');
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const tempMax = document.createElement('p');
  tempMax.innerHTML = `Max: ${max} &#8451;`;
  tempMax.classList.add('font-bold', 'text-white', 'text-center');

  const tempMin = document.createElement('p');
  tempMin.innerHTML = `Min: ${min} &#8451;`;
  tempMin.classList.add('font-bold', 'text-white', 'text-center');

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);



  resultado.appendChild(resultadoDiv);
}

const kelvinAcentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner(){
  
  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-cube-grid');


  divSpinner.innerHTML= `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>

  `;

  resultado.appendChild(divSpinner);
}