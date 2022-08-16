let events = [];
let pastE = [];
let futureE = [];
var categories =[];
let assistanceP= []
var upcomingECategory =[]
var pastECategory = []


//API DATA EVENTS
async function getDataEvents() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(resp => resp.json())
  .then(json => {
    events.push(...json.events)
    fechaActual = json.currentDate
    
  })
    
  //FUNCTION FILTER FUTURE EVENTS
  function futureEvents(){
    for(i=0; i<events.length; i++){
    
    if (fechaActual < events[i].date) {
      futureE.push(events[i])}}}
  futureEvents()
  //FUNCTION FILTER PAST EVENTS
    function pastEvents(){
    for(i=0; i<events.length; i++){    
    if (fechaActual > events[i].date) {
      pastE.push(events[i])}
    }
    }
  pastEvents()  
  assistance()
  categoriesFilter()
  futureEventsByCategory(futureE, categories);
  pastEventsByCategory(pastE, categories)  
}
getDataEvents()


//CREAR FUNCIÓN PARA OBTENER NOMBRE Y PORCENTAJE DE MAYOR Y MENOR ASISTENCIA Y CAPACIDAD DE TODOS LOS EVENTOS
function assistance() {
  pastE.forEach(event => {
    assistanceP.push(
      { nameEvent: event.name,
        porcentaje: ((event.assistance *100) /event.capacity).toFixed(2),
      }
    )
  }
  )  
  //Ordenamos los eventos con sus porcentajes de mayor a menor
  assistanceP.sort((a,b) => (b.porcentaje - a.porcentaje) )
  //Aca en un array pusheamos la capacidad de TODOS los eventos con sus nombres 
  var capacityAllEvents = []
  events.forEach(event =>{
    capacityAllEvents.push(
      {
      nameEvent: event.name,  
      capacidad: event.capacity
        }  )
    
  })
  //Ordenamos de mayor a menor las capacidades de esos eventos
  capacityAllEvents.sort((a,b) => (b.capacidad - a.capacidad))
  //Imprimimos en la tabla todos los datos
  let html = `
            <td class="col-4 "><b>${assistanceP[0].nameEvent}</b> with <b>${assistanceP[0].porcentaje}%</b> attendance</td>
            <td class="col-4 "><b>${assistanceP[29].nameEvent}</b> with <b>${assistanceP[29].porcentaje}%</b> attendance</td>
            <td class="col-4 "><b>${capacityAllEvents[0].nameEvent}</b>: ${new Intl.NumberFormat().format(capacityAllEvents[0].capacidad)}</td>
          
  `
document.querySelector("#gStats").innerHTML += html
}

//FILTRAR LAS CATEGORIAS
function categoriesFilter() {
  var allCategories = events.map((event) => event.category); //Recorremos todas las categorias
  let arrayCategories = new Set(allCategories); //Filtramos las categorias que estan repetidas con Set
  categories.push(...arrayCategories);
  
}
//CREAMOS UNA FUNCIÓN PARA CALCULAR INGRESOS POR CATEGORIA Y PORCENTAJE DE ASISTENCIA POR CATEGORIA
function futureEventsByCategory(eventos, categorias){
    
    categorias.forEach(cat =>{
      //Obtenemos las capacidades
      let capacidades = []
      eventos.filter(event =>event.category === cat && capacidades.push(Number(event.capacity)))
      
      //Sumamos las capacidades
      let capacidadSumada = 0
      for(i=0; i < capacidades.length; i++){
        capacidadSumada += capacidades[i]
      }
      
      //Obtenemos los Ingresos
      let ingresos = []
      eventos.filter(event => event.category === cat && ingresos.push(event.price * (Number(event.estimate))))
      //Sumamos los ingresos
    
      let sumaIngresos = 0
      for(i=0; i<ingresos.length; i++){
        sumaIngresos += ingresos[i]
      }
      //Obtenemos las asistencias y estimates
      let asistencia = []
      eventos.filter(event => event.category === cat && asistencia.push(Number(event.estimate)))
      //Sumamos la asistencias o estimates
      let sumaAsistencias = 0
      for(i=0; i<asistencia.length;i++){
        sumaAsistencias += asistencia[i]
      }
      upcomingECategory.push({
        categoria: cat,
        capacidad: capacidadSumada,
        ingresos: sumaIngresos,
        porcentajeAsistencia: (sumaAsistencias*100/capacidadSumada).toFixed(2)
      })
      
      var html = ""
      for(i=1; i<upcomingECategory.length;i++){
  
  html += ` <tr>
            <td class="col-4 fw-bold">${upcomingECategory[i].categoria}</td>
            <td class="col-4 "> $${new Intl.NumberFormat().format(upcomingECategory[i].ingresos)}</td>
            <td class="col-4 ">${upcomingECategory[i].porcentajeAsistencia}%</td>
          </tr>

  `
  document.querySelector("#upcomingS").innerHTML = html;
}

      
    })
    
  }

//CREAMOS UNA FUNCIÓN PARA CALCULAR INGRESOS POR CATEGORIA Y PORCENTAJE DE ASISTENCIA POR CATEGORIA

function pastEventsByCategory(eventos, categorias){
    
    categorias.forEach(cat =>{
      //Obtenemos las capacidades
      let capacidades = []
      eventos.filter(event =>event.category === cat && capacidades.push(Number(event.capacity)))
      
      //Sumamos las capacidades
      let capacidadSumada = 0
      for(i=0; i < capacidades.length; i++){
        capacidadSumada += capacidades[i]
      }
      
      //Obtenemos los Ingresos
      let ingresos = []
      eventos.filter(event => event.category === cat && ingresos.push(event.price * (Number(event.assistance))))
      //Sumamos los ingresos
      
      let sumaIngresos = 0
      for(i=0; i<ingresos.length; i++){
        sumaIngresos += ingresos[i]
      }
      //Obtenemos las asistencias y estimates
      let asistencia = []
      eventos.filter(event => event.category === cat && asistencia.push(Number(event.assistance)))
      //Sumamos la asistencias o estimates
      let sumaAsistencias = 0
      for(i=0; i<asistencia.length;i++){
        sumaAsistencias += asistencia[i]
      }
      pastECategory.push({
        categoria: cat,
        capacidad: capacidadSumada,
        ingresos: sumaIngresos,
        porcentajeAsistencia: (sumaAsistencias*100/capacidadSumada).toFixed(2)
      })
      
      var html = ""

  for(i=0; i<pastECategory.length;i++){
  
  html += `
            <tr>
            <td class="col-4 fw-bold">${pastECategory[i].categoria}</td>
            <td class="col-4 "> $${new Intl.NumberFormat().format(pastECategory[i].ingresos)}</td>
            <td class="col-4 ">${pastECategory[i].porcentajeAsistencia}%</td>
          </tr>

  `
  document.querySelector("#pastS").innerHTML = html;
  }
  })

}


